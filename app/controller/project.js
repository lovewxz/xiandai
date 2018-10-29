'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createProjectTransfer = {
      content: { type: 'string', require: true, allowEmpty: false },

      doctor_id: { type: 'array', require: true, allowEmpty: false },
      head_img: { type: 'string', require: true, allowEmpty: false },
      recover_time: { type: 'string', require: true, allowEmpty: false },
      result_img: { type: 'string', require: true, allowEmpty: false },
      advantange: { type: 'string', require: true, allowEmpty: false },
      fit_people: { type: 'string', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const params = ctx.request.query || {}
    const res = await ctx.service.project.index(params)
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createProjectTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.project.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createProjectTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.project.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.project.destroy(id)
    ctx.helper.success({ ctx, res })
  }

  async edit() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      throw ('404', 'id不存在')
    }
    let res = await ctx.service.project.getProjectById(id)
    res = Object.assign(res, {
      build_plan: res.build_plan ? res.build_plan.split(',') : [],
      time_list: JSON.parse(res.time_list)
    })
    ctx.helper.success({ ctx, res })
  }
}

module.exports = ProjectController
