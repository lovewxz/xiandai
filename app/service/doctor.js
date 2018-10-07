'use strict'

const Service = require('egg').Service

class DoctorService extends Service {
  async index() {
    const { app } = this
    const queryColumn = 'a.id id,a.doctor_name doctor_name,a.goods_project goods_project,a.appointment_count appointment_count,a.up_hits up_hits,a.img_url img_url,c.channel_name channel_name,b.title title,b.introduction introduction,b.content content,b.hits hits,b.search_text search_text'
    let sql = `select ${queryColumn} from ${app.config.tablePrefix}doctor a left join ${app.config.tablePrefix}content b on a.content_id = b.content_id left join ${app.config.tablePrefix}channel c on b.channel_id = c.channel_id`
    const result = await this.app.mysql.query(sql);
    return result
  }
  async create(params) {
    const { app } = this
    const result = await app.mysql.beginTransactionScope(async conn => {
        // don't commit or rollback by yourself
        const doctorResult = await conn.insert(`${app.config.tablePrefix}doctor`, {
            content_id: params.content_id,
            doctor_name: params.doctor_name,
            title: params.title,
            goods_project: params.goods_project,
            appointment_count: params.appointment_count,
            up_hits: params.up_hits,
            img_url: params.img_url
          })
        const contentResult = await conn.insert(`${app.config.tablePrefix}content`, {
            channel_id: params.channel_id,
            type_id: params.type_id,
            title: params.title,
            sub_title: params.sub_title,
            introduction: params.introduction,
            content: params.content,
            hits: params.hits,
            search_text: params.search_text
          })
        return { success: true };
      }, ctx);
    return result
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.beginTransactionScope(async conn => {
        // don't commit or rollback by yourself
        const doctorResult = await conn.update(
            `${app.config.tablePrefix}doctor`,
            {
                content_id: params.content_id,
                doctor_name: params.doctor_name,
                title: params.title,
                goods_project: params.goods_project,
                appointment_count: params.appointment_count,
                up_hits: params.up_hits,
                img_url: params.img_url
            },
            {
              where: {
                id: id
              }
            }
          )
        const contentResult = await conn.update(
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
        return { success: true };
      }, ctx);
    return result
  }
  async destroy(id) {
    const { app } = this
    const result = await app.mysql.beginTransactionScope(async conn => {
        // don't commit or rollback by yourself
        const doctorResult = await conn.delete(`${app.config.tablePrefix}doctor`, {
            id: id
        })
        const contentResult = await conn.delete(`${app.config.tablePrefix}content`, {
            content_id: id
        })
        return { success: true };
      }, ctx);
    return result
  }
}

module.exports = DoctorService
