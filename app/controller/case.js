'use strict'

const Controller = require('egg').Controller

class CaseController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createCaseTransfer = {
      class_id: { type: 'int', require: true, allowEmpty: false },
      title: { type: 'string', require: true, allowEmpty: false },
      name: { type: 'string', require: true, allowEmpty: false },
      introduction: { type: 'string', require: true, allowEmpty: false },
      head_img: { type: 'string', require: true, allowEmpty: false },
      result_img: { type: 'string', require: true, allowEmpty: false },
      status: { type: 'int', require: true, allowEmpty: false },

      time_list: { type: 'array', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const params = ctx.request.query || {}
    const res = await ctx.service.case.index(params)
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createCaseTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.case.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createCaseTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.case.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.case.destroy(id)
    ctx.helper.success({ ctx, res })
  }

  async edit() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      throw ('404', 'id不存在')
    }
    let res = await ctx.service.case.getCaseById(id)
    res = Object.assign(res, {
      build_plan: res.build_plan ? res.build_plan.split(',') : [],
      time_list: JSON.parse(res.time_list)
    })
    ctx.helper.success({ ctx, res })
  }
}

module.exports = CaseController
