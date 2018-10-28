'use strict'

const Service = require('egg').Service
const uuidV4 = require('uuid/v4')

class DoctorService extends Service {
  async index() {
    const { app } = this
    const queryColumn =
      'a.id id,a.content_id content_id,a.doctor_name doctor_name,a.goods_project goods_project,a.appointment_count appointment_count,a.up_hits up_hits,a.img_url img_url,a.list_url list_url, c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }doctor a left join ${
      app.config.tablePrefix
    }content b on a.content_id = b.content_id left join ${
      app.config.tablePrefix
    }channel c on b.channel_id = c.channel_id`
    const result = await this.app.mysql.query(sql)
    return result
  }
  async create(params) {
    const { app, ctx } = this
    const uuid = uuidV4()
    const result = await app.mysql.beginTransactionScope(async conn => {
      const contentObj = {
        content_id: uuid,
        title: params.title,
        sub_title: params.sub_title,
        content: params.content,
        status: params.status
      }
      await ctx.service.content.create(contentObj)

      // don't commit or rollback by yourself
      await conn.insert(`${app.config.tablePrefix}doctor`, {
        content_id: uuid,
        doctor_name: params.doctor_name,
        goods_project: params.goods_project.join(','),
        appointment_count: params.appointment_count,
        up_hits: params.up_hits,
        img_url: params.img_url,
        list_url: params.list_url,
        profession: params.profession
      })

      return { success: true }
    }, ctx)
    return result
  }
  async update(params, id) {
    const { app } = this
    const ctx = this.ctx
    const result = await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.update(
        `${app.config.tablePrefix}doctor`,
        {
          doctor_name: params.doctor_name,
          title: params.title,
          goods_project: params.goods_project,
          appointment_count: params.appointment_count,
          up_hits: params.up_hits,
          img_url: params.img_url,
          list_url: params.list_url,
          profession: params.profession
        },
        {
          where: {
            id
          }
        }
      )
      await conn.update(
        `${app.config.tablePrefix}content`,
        {
          channel_id: params.channel_id,
          class_id: params.class_id,
          title: params.title,
          sub_title: params.sub_title,
          introduction: params.introduction,
          content: params.content,
          hits: params.hits,
          search_text: params.search_text,
          status: params.status
        },
        {
          where: {
            content_id: params.content_id
          }
        }
      )
      return { success: true }
    }, ctx)
    return result
  }
  async destroy(id) {
    const { app } = this
    const ctx = this.ctx
    const result = await app.mysql.beginTransactionScope(async conn => {
      const doctorObj = await app.mysql.get(`${app.config.tablePrefix}doctor`, {
        id
      })
      await conn.delete(`${app.config.tablePrefix}doctor`, {
        id
      })
      await conn.delete(`${app.config.tablePrefix}content`, {
        content_id: doctorObj.content_id
      })
      return { success: true }
    }, ctx)
    return result
  }
  async getDoctorById(id) {
    const { app } = this
    const queryColumn =
      'a.id id,a.content_id content_id,a.doctor_name doctor_name,a.goods_project goods_project,a.appointment_count appointment_count,a.up_hits up_hits,a.img_url img_url,a.list_url list_url, c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }doctor a left join ${
      app.config.tablePrefix
    }content b on a.content_id = b.content_id left join ${
      app.config.tablePrefix
    }channel c on b.channel_id = c.channel_id where a.id = ?`
    const result = await this.app.mysql.queryOne(sql, id)
    return result
  }
}

module.exports = DoctorService
