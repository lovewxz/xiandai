'use strict'

const Service = require('egg').Service
const DateUtils = require('../utils/dateUtils')

class ContentService extends Service {
  async queryByChannelId(channelId) {
    const { app } = this
    const result = await app.mysql.get(`${app.config.tablePrefix}content`, {
      channel_id: channelId
    })
    let blExist = false
    if (result != null) {
      blExist = true
    }
    return blExist
  }

  async queryByClassId(classId) {
    const { app } = this
    const sql =
      'select count(1) count from hospital_content where  class_id in(SELECT class_id FROM hospital_content_class WHERE FIND_IN_SET(class_id,queryChildrenTypeInfo(?)))'
    const result = await app.mysql.queryOne(sql, classId)
    let blExist = false
    if (result.count > 0) {
      blExist = true
    }
    return blExist
  }

  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(`${app.config.tablePrefix}content`, {
      content_id: params.content_id,
      channel_id: params.channel_id,
      class_id: params.class_id,
      title: params.title,
      sub_title: params.sub_title,
      introduction: params.introduction,
      content: params.content,
      hits: params.hits,
      status: params.status
    })
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const dateUtils = new DateUtils()
    const result = await app.mysql.update(
      `${app.config.tablePrefix}content`,
      {
        updated_time: dateUtils.getNowFormatDate(),
        content_id: params.content_id,
        channel_id: params.channel_id,
        class_id: params.class_id,
        title: params.title,
        sub_title: params.sub_title,
        introduction: params.introduction,
        content: params.content,
        hits: params.hits,
        status: params.status
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
