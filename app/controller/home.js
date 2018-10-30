'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createHomeTransfer = {
        banner: { type: 'array', require: false, allowEmpty: true },
        icon: { type: 'array', require: true, allowEmpty: false },
        sale: { type: 'array', require: true, allowEmpty: false },
        beauty_share: { type: 'array', require: false, allowEmpty: true },
        group_photo: { type: 'string', require: true, allowEmpty: true },
        swt_pic: { type: 'string', require: true, allowEmpty: true }
    }
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createHomeTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.home.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createHomeTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', '类型不存在')
    }
    const res = await ctx.service.home.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async edit() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      throw ('404', '类型不存在')
    }
    let res = await ctx.service.home.getHomeById(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = HomeController