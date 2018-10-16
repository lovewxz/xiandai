'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createProjectTransfer = {
      channel_id: { type: 'int', require: true, allowEmpty: false },
      type_id: { type: 'int', require: true, allowEmpty: false },
      sub_title: { type: 'string', require: true, allowEmpty: false },
      introduction: { type: 'string', require: true, allowEmpty: false },
      content: { type: 'string', require: true, allowEmpty: false },
      hits: { type: 'int', require: true, allowEmpty: false },
      search_text: { type: 'string', require: true, allowEmpty: false },

      content_id: { type: 'int', require: true, allowEmpty: false },
      head_img: { type: 'string', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.project.index()
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
}

module.exports = ProjectController
