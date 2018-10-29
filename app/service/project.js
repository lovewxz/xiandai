'use strict'

const Service = require('egg').Service
const uuidV4 = require('uuid/v4')

class ProjectService extends Service {
  async index(params) {
    const { app } = this
    const limitCount = (params.pageNo - 1) * params.pageSize
    const queryColumn =
      'a.id id,a.head_img head_img,a.result_img result_img,a.recover_time recover_time,a.advantange advantange,a.fit_people fit_people,c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }project a left join ${
      app.config.tablePrefix
    }content b on a.content_id = b.content_id left join ${
      app.config.tablePrefix
    }channel c on b.channel_id = c.channel_id limit ?,?`
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
    const uuidContent = uuidV4()
    const uuidProject = uuidV4()
    const result = await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.insert(`${app.config.tablePrefix}project`, {
        id: uuidProject,
        content_id: uuidContent,
        head_img: params.head_img,
        recover_time: params.recover_time,
        result_img: params.result_img,
        advantange: params.advantange,
        fit_people: params.fit_people
      })

      for (const i in params.doctor_id) {
        const projectDoctorObj = {
          project_id: uuidProject,
          doctor_id: params.doctor_id[i]
        }
        await ctx.service.projectDoctor.create(projectDoctorObj)
      }

      const contentClass = await this.app.mysql.get(
        `${app.config.tablePrefix}content_class`,
        { class_id: params.class_id }
      )
      const contentObj = {
        content_id: uuidContent,
        channel_id: contentClass.channel_id,
        class_id: params.class_id,
        title: params.title,
        sub_title: '',
        introduction: '',
        content: params.content,
        hits: 0,
        status: params.status
      }
      await ctx.service.content.create(contentObj)
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
          head_img: params.head_img,
          recover_time: params.recover_time,
          result_img: params.result_img,
          advantange: params.advantange,
          fit_people: params.fit_people,
          doctor_id: params.doctor_id.join()
        },
        {
          where: {
            id
          }
        }
      )
      for (const i in params.doctor_id) {
        const projectDoctorInfo = await this.app.mysql.get(
          `${app.config.tablePrefix}projectDoctor`,
          { project_id: id, doctor_id: params.doctor_id[i] }
        )
        if (!isNaN(projectDoctorInfo)) {
          const projectDoctorObj = {
            project_id: id,
            doctor_id: params.doctor_id[i]
          }
          await ctx.service.projectDoctor.create(projectDoctorObj)
        }
      }
      const sql = `delete from ${
        app.config.tablePrefix
      }projectDoctor where doctor_id not in (?)`
      await this.app.mysql.query(sql, params.doctor_id)
      const projectInfo = await this.app.mysql.get(
        `${app.config.tablePrefix}project`,
        { id }
      )
      const contentClass = await this.app.mysql.get(
        `${app.config.tablePrefix}content_class`,
        { class_id: params.class_id }
      )
      const contentObj = {
        channel_id: contentClass.channel_id,
        class_id: params.class_id,
        title: params.title,
        content: params.content,
        status: params.status,
        sub_title: '',
        introduction: '',
        hits: 0
      }
      await this.ctx.service.content.update(contentObj, projectInfo.content_id)
      return { success: true }
    }, ctx)
    return result
  }
  async destroy(id) {
    const { app } = this
    const ctx = this.ctx
    const result = await app.mysql.beginTransactionScope(async conn => {
      const doctorObj = await app.mysql.get(
        `${app.config.tablePrefix}project`,
        {
          id
        }
      )
      await conn.delete(`${app.config.tablePrefix}project`, {
        id
      })
      await ctx.service.content.destroy(doctorObj.content_id)
      await ctx.service.projectDoctor.delete(id)
      return { success: true }
    }, ctx)
    return result
  }

  async getProjectById(id) {
    const { app } = this
    const queryColumn =
      'a.id id,a.content_id content_id,b.class_id class_id,c.class_name class_name,a.head_img head_img,a.result_img result_img,a.recover_time recover_time,a.advantange advantange,a.fit_people fit_people,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }project a left join ${
      app.config.tablePrefix
    }content b on a.content_id = b.content_id left join ${
      app.config.tablePrefix
    }content_class c on c.class_id = b.class_id where a.id = ?`
    const result = await this.app.mysql.queryOne(sql, id)
    const projectDoctorSql = `select a.doctor_id,b.doctor_name from ${
      app.config.tablePrefix
    }project_doctor a left join ${
      app.config.tablePrefix
    }doctor b on a.doctor_id = b.id where a.project_id = ?`
    const results = await this.app.mysql.query(projectDoctorSql, id)
    result.doctor_id = results
    return result
  }
}

module.exports = ProjectService
