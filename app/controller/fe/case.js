'use strict'

const Controller = require('egg').Controller

class CaseController extends Controller {
  async index() {
    const { ctx } = this
    const { settings, projectContent } = ctx.params
    const list = await ctx.service.case.index({})
    await ctx.render('caseList.ejs', { settings, projectContent, list })
  }
  async edit() {
    const { ctx } = this
    const { settings, projectContent } = ctx.params
    const { id } = ctx.params
    const model = await ctx.service.case.getCaseById(id)
    model.time_list = JSON.parse(model.time_list)
    await ctx.render('caseDetail.ejs', { settings, projectContent, model })
  }
}

module.exports = CaseController
