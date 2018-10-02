'use strict'

const Controller = require('egg').Controller

class UserAccessController extends Controller {
  async getUserById() {
    const { ctx } = this
    const { user } = ctx.state
    const userId = user.data.userId
    const res = await ctx.service.user.getUserById(userId)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = UserAccessController
