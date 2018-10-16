'use strict'

const Service = require('egg').Service

class ProjectCaseService extends Service {
  async index() {
    const { app } = this
    const result = await app.mysql.select(
      `${app.config.tablePrefix}project_case`,
      {
        columns: ['id', 'project_id', 'case_id']
      }
    )
    return result
  }
  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(
      `${app.config.tablePrefix}project_case`,
      {
        id: params.id,
        project_id: params.project_id,
        case_id: params.case_id
      }
    )
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}project_case`,
      {
        id: params.id,
        project_id: params.project_id,
        case_id: params.case_id
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
    const result = await app.mysql.delete(
      `${app.config.tablePrefix}project_case`,
      {
        id
      }
    )
    return result.affectedRows === 1
  }
}

module.exports = ProjectCaseService
