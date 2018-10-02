'use strict'

const Service = require('egg').Service

class UserAccessService extends Service {
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
    return result.affectedRows === 1
  }

  async login(payload) {
    const { ctx, app, service } = this
    const user = await app.mysql.get(`${app.config.tablePrefix}user`, {
      login_name: payload.login_name
    })
    if (!user) {
      ctx.throw(404, '用户名或密码错误')
    }
    const match = await ctx.helper.comparePassword(
      payload.login_pwd,
      user.login_pwd
    )
    if (!match) {
      ctx.throw(404, '用户名或密码错误')
    }
    const token = await service.actionToken.apply(user.user_id)
    return { token }
  }

  logout() {}
}

module.exports = UserAccessService
