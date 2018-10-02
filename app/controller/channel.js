'use strict'

const Controller = require('egg').Controller

class ChannelController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createChannelTransfer = {
      channel_name: { type: 'string', require: true, allowEmpty: false },
      channel_url: { type: 'string', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.channel.index()
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createChannelTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.channel.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createChannelTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.channel.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.channel.destroy(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = ChannelController
