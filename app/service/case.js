'use strict'

const Service = require('egg').Service
const DateUtils = require('../utils/dateUtils')

class CaseService extends Service {
  async index(params) {
    const { app } = this
    params.pageNo = isNaN(params.pageNo) ? 1 : params.pageNo
    params.pageSize = isNaN(params.pageSize) ? 100 : params.pageSize
    const limitCount = (params.pageNo - 1) * params.pageSize
    const queryColumn =
      'a.id id,a.name name,a.title title,a.head_img head_img,a.result_img result_img,a.build_plan build_plan,c.channel_name channel_name,b.class_name class_name,a.introduction introduction,a.status status,a.updated_time updated_time'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }case a left join ${
      app.config.tablePrefix
    }content_class b on a.class_id = b.class_id left join ${
      app.config.tablePrefix
    }channel c on b.channel_id = c.channel_id limit ?,?`
    const paramsSql = [limitCount, parseInt(params.pageSize)]
    const result = await this.app.mysql.query(sql, paramsSql)

    const resultTotalCount = await this.app.mysql.queryOne(
      `select count(1) totalCount from ${app.config.tablePrefix}case`
    )
    const resultObj = {
      detail: result,
      summary: resultTotalCount
    }
    return resultObj
  }

  async create(params) {
    const { app } = this
    const contentClass = await this.app.mysql.get(
      `${app.config.tablePrefix}content_class`,
      { class_id: params.class_id }
    )

    const result = await app.mysql.insert(`${app.config.tablePrefix}case`, {
      title: params.title,
      name: params.name,
      head_img: params.head_img,
      class_id: params.class_id,
      channel_id: contentClass.channel_id,
      result_img: params.result_img,
      build_plan: params.build_plan.join(),
      introduction: params.introduction,
      status: params.status,
      article_json: JSON.stringify(params.time_list)
    })
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const dateUtils = new DateUtils()
    const contentClass = await this.app.mysql.get(
      `${app.config.tablePrefix}content_class`,
      { class_id: params.class_id }
    )
    const result = await app.mysql.update(
      `${app.config.tablePrefix}case`,
      {
        updated_time: dateUtils.getNowFormatDate(),
        channel_id: contentClass.channel_id,
        class_id: params.class_id,
        introduction: params.introduction,
        title: params.title,
        name: params.name,
        head_img: params.head_img,
        result_img: params.result_img,
        build_plan: params.build_plan.join(),
        status: params.status,
        article_json: JSON.stringify(params.time_list)
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
    const result = await app.mysql.delete(`${app.config.tablePrefix}case`, {
      id
    })
    return result.affectedRows === 1
  }

  async getCaseById(id) {
    const { app } = this
    const queryColumn =
      'a.id id,a.class_id class_id,b.class_name class_name,a.name name,a.title title, a.head_img head_img,a.result_img result_img,a.build_plan build_plan,a.introduction introduction,a.status status,a.article_json time_list'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }case a left join ${
      app.config.tablePrefix
    }content_class b on a.class_id = b.class_id where a.id = ?`
    const result = await this.app.mysql.queryOne(sql, id)
    return result
  }
}

module.exports = CaseService
