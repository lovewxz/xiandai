'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const { settings, projectContent } = ctx.params
    const classContent = await ctx.service.fe.home.classIndex()
    await ctx.render('index.ejs', {
      settings,
      classContent,
      projectContent
    })
  }
}

module.exports = HomeController
