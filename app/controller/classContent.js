'use strict'

const Controller = require('egg').Controller

class ClassContentController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createClassContentTransfer = {
      class_id: { type: 'int', require: true, allowEmpty: false },
      content_id: { type: 'int', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.classContent.index()
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createClassContentTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.classContent.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createClassContentTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.classContent.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.classContent.destroy(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = ClassContentController
