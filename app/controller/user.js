'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async create() {
    const ctx = this.ctx
    const result = await ctx.service.user.create()
    ctx.body = result
  }
}

module.exports = UserController
