'use strict'

const Service = require('egg').Service

class UserService extends Service {
  async hasUserByName(name) {
    const { ctx, app } = this
    const user = await app.mysql.get(`${app.config.tablePrefix}user`, {
      login_name: name
    })
    if (user) {
      ctx.throw('404', '用户已经存在')
    }
    return !!user
  }
  async getUserById(id) {
    const { ctx, app } = this
    const user = await app.mysql.get(
      `${app.config.tablePrefix}user`,
      {
        user_id: id
      },
      { columns: ['user_id', 'login_name'] }
    )
    if (!user) {
      ctx.throw('404', '用户不存在')
    }
    return user
  }
}

module.exports = UserService
