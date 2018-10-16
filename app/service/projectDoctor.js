'use strict'

const Service = require('egg').Service

class ProjectDoctorService extends Service {
  async index() {
    const { app } = this
    const result = await app.mysql.select(
      `${app.config.tablePrefix}project_doctor`,
      {
        columns: ['id', 'project_id', 'doctor_id']
      }
    )
    return result
  }
  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(
      `${app.config.tablePrefix}project_doctor`,
      {
        id: params.id,
        project_id: params.project_id,
        doctor_id: params.doctor_id
      }
    )
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}project_doctor`,
      {
        id: params.id,
        project_id: params.project_id,
        doctor_id: params.doctor_id
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
      `${app.config.tablePrefix}project_doctor`,
      {
        id
      }
    )
    return result.affectedRows === 1
  }
}

module.exports = ProjectDoctorService
