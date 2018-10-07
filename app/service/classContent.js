'use strict'

const Service = require('egg').Service

class ClassContentService extends Service {
  async index() {
    const { app } = this
    const result = await app.mysql.select(`${app.config.tablePrefix}class_content`, {
        columns: ['id', 'class_id', 'content_id']
      })
      return result
  }
  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(`${app.config.tablePrefix}class_content`, {
        id: params.id,
        class_id: params.class_id,
        content_id: params.content_id
    })
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}class_content`,
      {
        id: params.id,
        class_id: params.class_id,
        content_id: params.content_id
      },
      {
        where: {
            id: id
        }
      }
    )
    return result.affectedRows === 1
  }
  async destroy(id) {
    const { app } = this
    const result = await app.mysql.delete(`${app.config.tablePrefix}class_content`, {
        id: id
    })
    return result.affectedRows === 1
  }
}

module.exports = ClassContentService