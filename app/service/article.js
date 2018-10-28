'use strict'

const Service = require('egg').Service

class ArticleService extends Service {
  async queryByCaseId(caseId) {
    const { app } = this
    const result = await app.mysql.get(`${app.config.tablePrefix}article`, {
      case_id: caseId
    })
    let blExist = false
    if (result != null) {
      blExist = true
    }
    return blExist
  }

  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(`${app.config.tablePrefix}article`, {
      case_id: params.case_id,
      photos: params.photos,
      content: params.content,
      recovery_day: params.recovery_day
    })
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}article`,
      {
        photos: params.photos,
        recovery_day: params.recovery_day,
        content: params.content,
        hits: params.hits
      },
      {
        where: {
          id
        }
      }
    )
    return result.affectedRows === 1
  }
  async destroy(id) {
    const { app } = this
    const result = await app.mysql.delete(`${app.config.tablePrefix}article`, {
      id
    })
    return result.affectedRows === 1
  }
}

module.exports = ArticleService
