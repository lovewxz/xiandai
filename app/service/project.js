'use strict'

const Service = require('egg').Service

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
    const result = await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.insert(`${app.config.tablePrefix}project`, {
        content_id: params.content_id,
        head_img: params.head_img
      })
      const contentObj = {
        channel_id: params.channel_id,
        class_id: params.class_id,
        title: params.title,
        sub_title: params.sub_title,
        introduction: params.introduction,
        content: params.content,
        hits: params.hits,
        search_text: params.search_text
      }
      this.ctx.service.content.create(contentObj)
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
          content_id: params.content_id,
          head_img: params.head_img
        },
        {
          where: {
            id
          }
        }
      )
      const contentObj = {
        channel_id: params.channel_id,
        class_id: params.class_id,
        title: params.title,
        sub_title: params.sub_title,
        introduction: params.introduction,
        content: params.content,
        hits: params.hits,
        search_text: params.search_text
      }
      this.ctx.service.content.update(contentObj, params.id)
      return { success: true }
    }, ctx)
    return result
  }
  async destroy(id) {
    const { app } = this
    const ctx = this.ctx
    const result = await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.delete(`${app.config.tablePrefix}project`, {
        id
      })
      this.ctx.service.content.destroy(id)
      return { success: true }
    }, ctx)
    return result
  }
}

module.exports = ProjectService
