'use strict'

const Service = require('egg').Service

class ContentClassService extends Service {
  async index() {
    const { app } = this
    const queryColumn =
      'a.channel_id channel_id,b.channel_name channel_name,a.class_id class_id,a.class_name class_name,a.parent_id parent_id,c.class_name parent_name'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }content_class a left join ${
      app.config.tablePrefix
    }channel b on a.channel_id = b.channel_id left join ${
      app.config.tablePrefix
    }content_class c on a.parent_id = c.class_id`
    const result = await this.app.mysql.query(sql)
    return result
  }
  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(
      `${app.config.tablePrefix}content_class`,
      {
        channel_id: params.channel_id,
        class_name: params.class_name,
        parent_id: params.parent_id
      }
    )
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}content_class`,
      {
        channel_id: params.channel_id,
        class_name: params.class_name,
        parent_id: params.parent_id
      },
      {
        where: {
          class_id: id
        }
      }
    )
    return result.affectedRows === 1
  }
  async destroy(id) {
    const { app, ctx } = this
    const blExist = await ctx.service.content.queryByClassId(id)
    if (blExist) {
      throw new Error()
    }
    const result = await app.mysql.delete(
      `${app.config.tablePrefix}content_class`,
      {
        class_id: id
      }
    )
    return result.affectedRows === 1
  }
}

module.exports = ContentClassService
