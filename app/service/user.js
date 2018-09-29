'use strict'

const Service = require('egg').Service

class UserService extends Service {
  async create() {
    const { helper } = this.ctx
    const { config } = this.app
    const params = {
      login_name: 'admin',
      full_name: 'admin'
    }
    const hash = await helper.createPassword('123456')
    params.login_pwd = hash
    const result = await this.app.mysql.insert(
      `${config.tablePrefix}user`,
      params
    )
    return { result: result.affectedRows === 1 }
  }
}

module.exports = UserService
