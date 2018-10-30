'use strict'

const Controller = require('egg').Controller

class NewsController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createNewsTransfer = {
      content: { type: 'string', require: false, allowEmpty: true },
      Importance: { type: 'int', require: true, allowEmpty: false },
      title: { type: 'string', require: true, allowEmpty: false },
      status: { type: 'int', require: true, allowEmpty: true }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.news.index()
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createNewsTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.news.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createNewsTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.news.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.news.destroy(id)
    ctx.helper.success({ ctx, res })
  }
  async edit() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      throw ('404', 'id不存在')
    }
    let res = await ctx.service.news.getNewsById(id)
    // res = Object.assign(res, {
    //   goods_project: res.goods_project ? res.goods_project.split(',') : []
    // })
    ctx.helper.success({ ctx, res })
  }
}

module.exports = NewsController