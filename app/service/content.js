'use strict'

const Service = require('egg').Service

class ContentService extends Service {
  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(`${app.config.tablePrefix}content`, {
      channel_id: params.channel_id,
      type_id: params.type_id,
      title: params.title,
      sub_title: params.sub_title,
      introduction: params.introduction,
      content: params.content,
      hits: params.hits,
      search_text: params.search_text
    })
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}content`,
      {
        channel_id: params.channel_id,
        type_id: params.type_id,
        title: params.title,
        sub_title: params.sub_title,
        introduction: params.introduction,
        content: params.content,
        hits: params.hits,
        search_text: params.search_text
      },
      {
        where: {
          content_id: id
        }
      }
    )
    return result.affectedRows === 1
  }
  async destroy(id) {
    const { app } = this
    const result = await app.mysql.delete(`${app.config.tablePrefix}content`, {
      content_id: id
    })
    return result.affectedRows === 1
  }
}

module.exports = ContentService
