'use strict'

const Service = require('egg').Service

class IndexService extends Service {
  async create(params) {
    const { app, ctx } = this
    const result = await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.insert(`${app.config.tablePrefix}config`, {
        setting_type: 10,
        setting_key: 'home',
        content: JSON.stringify(params)
      })

      return { success: true }
    }, ctx)
    return result
  }
  async update(params, settingType) {
    const { app } = this
    const ctx = this.ctx
    const homeInfo = await this.app.mysql.get(
      `${app.config.tablePrefix}config`,
      { setting_type: settingType }
    )
    const result = await app.mysql.beginTransactionScope(async conn => {
      if (isNaN(homeInfo) || homeInfo == null) {
        await this.create(params)
      } else {
        await conn.update(
          `${app.config.tablePrefix}config`,
          {
            content: JSON.stringify(params)
          },
          {
            where: {
              setting_type: settingType
            }
          }
        )
      }
      return { success: true }
    }, ctx)
    return result
  }
  async getIndexById(settingType) {
    const { app } = this
    const queryColumn = 'content content'
    const sql = `select ${queryColumn} from ${
      app.config.tablePrefix
    }config  where setting_type = ?`
    const result = await this.app.mysql.queryOne(sql, settingType)
    return JSON.parse(result.content)
  }
}

module.exports = IndexService
