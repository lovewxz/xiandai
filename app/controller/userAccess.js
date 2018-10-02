'use strict'

const Controller = require('egg').Controller

class UserAccessController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.UserLoginTransfer = {
      login_name: { type: 'string', require: true, allowEmpty: false },
      login_pwd: { type: 'string', require: true, allowEmpty: false }
    }
  }
  async create() {
    const ctx = this.ctx
    const user = await ctx.service.user.hasUserByName('admin')
    if (!user) {
      const res = await ctx.service.userAccess.create()
      ctx.helper.success({ ctx, res })
    }
  }
  async login() {
    const { ctx } = this
    ctx.validate(this.UserLoginTransfer)
    const payload = ctx.request.body || {}
    const res = await ctx.service.userAccess.login(payload)
    ctx.helper.success({ ctx, res })
  }
  async logout() {
    const { ctx } = this
    await ctx.service.userAccess.logout()
    ctx.helper.success({ ctx })
  }
}

module.exports = UserAccessController
