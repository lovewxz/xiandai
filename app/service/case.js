'use strict'

const Service = require('egg').Service

class CaseService extends Service {
  async index() {
    const { app } = this
    const queryColumn =
      'a.id id,a.name name,a.head_img head_img,a.result_img result_img,a.build_plan build_plan,c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
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
    const { app } = this
    const ctx = this.ctx
    const result = await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.insert(`${app.config.tablePrefix}project`, {
        content_id: params.content_id,
        name: params.name,
        head_img: params.head_img,
        result_img: params.result_img,
        build_plan: params.build_plan
      })
      const contentObj = {
        channel_id: params.channel_id,
        type_id: params.type_id,
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
        `${app.config.tablePrefix}case`,
        {
          content_id: params.content_id,
          name: params.name,
          head_img: params.head_img,
          result_img: params.result_img,
          build_plan: params.build_plan
        },
        {
          where: {
            id
          }
        }
      )
      const contentObj = {
        channel_id: params.channel_id,
        type_id: params.type_id,
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
      await conn.delete(`${app.config.tablePrefix}case`, {
        id
      })
      this.ctx.service.content.destroy(id)
      return { success: true }
    }, ctx)
    return result
  }
}

module.exports = CaseService
