'use strict'

const Service = require('egg').Service

class CaseDoctorService extends Service {
  async index() {
    const { app } = this
    const result = await app.mysql.select(
      `${app.config.tablePrefix}case_doctor`,
      {
        columns: ['id', 'case_id', 'doctor_id']
      }
    )
    return result
  }
  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(
      `${app.config.tablePrefix}case_doctor`,
      {
        id: params.id,
        case_id: params.case_id,
        doctor_id: params.doctor_id
      }
    )
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}case_doctor`,
      {
        id: params.id,
        case_id: params.case_id,
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
      `${app.config.tablePrefix}case_doctor`,
      {
        id
      }
    )
    return result.affectedRows === 1
  }
}

module.exports = CaseDoctorService
