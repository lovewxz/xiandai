'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const res = await ctx.service.index.getIndexById(10)
    await ctx.render('index.ejs', res)
  }
}

module.exports = HomeController
