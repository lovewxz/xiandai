'use strict'

const Service = require('egg').Service

class ProjectService extends Service {
  async projectInfo(id) {
    const { app } = this
    const sql = `select a.recover_time ,a.advantange advantange,a.fit_people fit_people,a.result_img result_img, b.content content from ${
      app.config.tablePrefix
    }project a left join ${
      app.config.tablePrefix
    }content b on b.content_id = a.content_id
    where a.id = ?`
    const result = await this.app.mysql.queryOne(sql, id)
    const doctorSql = `select a.doctor_id,b.doctor_name,b.list_url from ${
      app.config.tablePrefix
    }project_doctor a left join ${
      app.config.tablePrefix
    }doctor b on b.id = a.doctor_id`
    const resultDoctor = await this.app.mysql.query(doctorSql)
    result.doctor = resultDoctor
    return result
  }
}

module.exports = ProjectService
