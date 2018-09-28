'use strict'

const Service = require('egg').Service

class UserService extends Service {
  async create() {
    const params = {
      login_name: 'admin',
      full_name: 'admin'
    }
    await this.ctx.helper.createPassword('123456').then(hash => {
      params.login_pwd = hash
    })
    const result = await this.app.mysql.insert('hospital_user', params)
    return { result: result.affectedRows === 1 }
  }
}

module.exports = UserService
