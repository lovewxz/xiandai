'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const { settings, projectContent } = ctx.params
    // const res = await ctx.service.index.getIndexById(10)
    const classContent = await ctx.service.fe.home.classIndex()
    // const projectContent = await ctx.service.fe.home.projectIndex()
    await ctx.render('index.ejs', {
      settings,
      classContent,
      projectContent
    })
  }
  async layouts() {
    const { ctx, app } = this
    const settings = await ctx.service.index.getIndexById(10)
    const projectContent = await ctx.service.fe.home.projectIndex()
    app.settings = settings
    app.projectContent = projectContent
  }
}

module.exports = HomeController
