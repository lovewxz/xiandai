'use strict'

const Service = require('egg').Service
const uuidV4 = require('uuid/v4')

class ProjectService extends Service {
  async index(params) {
    const { app } = this
    const limitCount = (params.pageNo - 1) * params.pageSize
    const queryColumn =
      'a.id id,a.head_img head_img,a.doctor_id doctor_id,d.doctor_name doctor_name,a.result_img result_img,a.technology technology,a.applicable_people applicable_people,c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }project a left join ${
      app.config.tablePrefix
    }content b on a.content_id = b.content_id left join ${
      app.config.tablePrefix
    }channel c on b.channel_id = c.channel_id left join ${
      app.config.tablePrefix
    }doctor d on d.doctor_id = a.doctor_id limit ?,?`
    const paramsSql = [limitCount, parseInt(params.pageSize)]
    const result = await this.app.mysql.query(sql, paramsSql)

    const resultTotalCount = await this.app.mysql.queryOne(
      `select count(1) totalCount from ${app.config.tablePrefix}project`
    )
    const resultObj = {
      detail: result,
      summary: resultTotalCount
    }
    return resultObj
  }
  async create(params) {
    const { app } = this
    const ctx = this.ctx
    const uuid = uuidV4()
    const result = await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.insert(`${app.config.tablePrefix}project`, {
        content_id: uuid,
        head_img: params.head_img,
        recover_time: params.recover_time,
        result_img: params.result_img,
        advantange: params.advantange,
        fit_people: params.fit_people,
        doctor_id: params.doctor_id.join()
      })

      const contentClass = await this.app.mysql.get(
        `${app.config.tablePrefix}content_class`,
        { class_id: params.class_id }
      )
      const contentObj = {
        content_id: uuid,
        channel_id: contentClass.channel_id,
        class_id: params.class_id,
        title: params.title,
        sub_title: '',
        introduction: '',
        content: params.content,
        hits: 0,
        status: params.status
      }
      await this.ctx.service.content.create(contentObj)
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
        `${app.config.tablePrefix}project`,
        {
          head_img: params.head_img,
          recover_time: params.recover_time,
          result_img: params.result_img,
          advantange: params.advantange,
          fit_people: params.fit_people,
          doctor_id: params.doctor_id.join()
        },
        {
          where: {
            id
          }
        }
      )
      const projectInfo = await this.app.mysql.get(
        `${app.config.tablePrefix}project`,
        { id: id }
      )
      const contentClass = await this.app.mysql.get(
        `${app.config.tablePrefix}content_class`,
        { class_id: params.class_id }
      )
      const contentObj = {
        channel_id: contentClass.channel_id,
        class_id: params.class_id,
        title: params.title,
        content: params.content,
        status: params.status,
        sub_title: '',
        introduction: '',
        hits: 0
      }
      await this.ctx.service.content.update(contentObj, projectInfo.content_id)
      return { success: true }
    }, ctx)
    return result
  }
  async destroy(id) {
    const { app } = this
    const ctx = this.ctx
    const result = await app.mysql.beginTransactionScope(async conn => {
      const doctorObj = await app.mysql.get(`${app.config.tablePrefix}project`, {
        id
      })
      await conn.delete(`${app.config.tablePrefix}project`, {
        id
      })
      await ctx.service.content.destroy(doctorObj.content_id)
      return { success: true }
    }, ctx)
    return result
  }
}

module.exports = ProjectService
