'use strict'

const Service = require('egg').Service
const uuidV4 = require('uuid/v4')

class NewsService extends Service {
  async index() {
    const { app } = this
    const queryColumn =
      'a.id id,a.content_id content_id,a.Importance Importance, c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text,b.status '
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
        channel_id: null,
        class_id: null,
        title: params.title,
        sub_title: '',
        introduction: '',
        content: params.content,
        hits: 0,
        status: params.status
      }
      await ctx.service.content.create(contentObj)

      // don't commit or rollback by yourself
      await conn.insert(`${app.config.tablePrefix}news`, {
        content_id: uuid,
        Importance: params.Importance
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
        `${app.config.tablePrefix}news`,
        {
            Importance: params.Importance
        },
        {
          where: {
            id
          }
        }
      )
      const newsInfo = await this.app.mysql.get(
        `${app.config.tablePrefix}news`,
        { id }
      )

      const contentObj = {
        channel_id: null,
        class_id: null,
        title: params.title,
        content: params.content,
        status: params.status,
        sub_title: '',
        introduction: '',
        hits: 0
      }
      await this.ctx.service.content.update(contentObj, newsInfo.content_id)
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
      'a.id id,a.content_id content_id,a.Importance Importance, c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
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