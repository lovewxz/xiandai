'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
  async index() {
    const { ctx } = this
    const { settings, projectContent } = ctx.params
    const { id } = ctx.params
    const projectInfo = await ctx.service.fe.project.projectInfo(id)
    await ctx.render('project.ejs', {
      settings,
      projectInfo,
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

module.exports = ProjectController
