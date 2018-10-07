'use strict'

const Controller = require('egg').Controller

class ContentClassController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createContentClassTransfer = {
      channel_id: { type: 'int', require: true, allowEmpty: false },
      parent_id: { type: 'int', require: true, allowEmpty: false },
      class_name: { type: 'string', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.contentClass.index()
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createContentClassTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.contentClass.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createContentClassTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.contentClass.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.contentClass.destroy(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = ContentClassController