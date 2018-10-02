'use strict'

const Service = require('egg').Service

class ChannelService extends Service {
  async index() {
    const { app } = this
    const result = await app.mysql.select(`${app.config.tablePrefix}channel`, {
      columns: ['channel_id', 'channel_name', 'channel_url']
    })
    return result
  }
  async create(params) {
    const { app } = this
    const result = await app.mysql.insert(`${app.config.tablePrefix}channel`, {
      channel_name: params.channel_name,
      channel_url: params.channel_url
    })
    return result.affectedRows === 1
  }
  async update(params, id) {
    const { app } = this
    const result = await app.mysql.update(
      `${app.config.tablePrefix}channel`,
      {
        channel_name: params.channel_name,
        channel_url: params.channel_url
      },
      {
        where: {
          channel_id: id
        }
      }
    )
    return result.affectedRows === 1
  }
  async destroy(id) {
    const { app } = this
    const result = await app.mysql.delete(`${app.config.tablePrefix}channel`, {
      channel_id: id
    })
    return result.affectedRows === 1
  }
}

module.exports = ChannelService
