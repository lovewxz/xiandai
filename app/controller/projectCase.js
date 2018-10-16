'use strict'

const Controller = require('egg').Controller

class ProjectCaseController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createProjectCaseTransfer = {
      project_id: { type: 'int', require: true, allowEmpty: false },
      case_id: { type: 'int', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.projectCase.index()
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createCaseDoctorTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.projectCase.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createProjectCaseTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.projectCase.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.projectCase.destroy(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = ProjectCaseController
