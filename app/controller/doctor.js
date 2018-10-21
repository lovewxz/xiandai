'use strict'

const Controller = require('egg').Controller

class DoctorController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createDoctorTransfer = {
      content: { type: 'string', require: false, allowEmpty: true },
      doctor_name: { type: 'string', require: true, allowEmpty: false },
      title: { type: 'string', require: true, allowEmpty: false },
      goods_project: { type: 'array', require: false, allowEmpty: true },
      appointment_count: { type: 'int', require: true, allowEmpty: true },
      up_hits: { type: 'int', require: true, allowEmpty: true },
      img_url: { type: 'string', require: true, allowEmpty: true },
      list_url: { type: 'string', require: true, allowEmpty: true },
      status: { type: 'string', require: true, allowEmpty: true },
      profession: { type: 'string', require: true, allowEmpty: true }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.doctor.index()
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createDoctorTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.doctor.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createDoctorTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.doctor.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.doctor.destroy(id)
    ctx.helper.success({ ctx, res })
  }
  async edit() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      throw ('404', 'id不存在')
    }
    let res = await ctx.service.doctor.getDoctorById(id)
    res = Object.assign(res, {
      goods_project: res.goods_project ? res.goods_project.split(',') : []
    })
    ctx.helper.success({ ctx, res })
  }
}

module.exports = DoctorController
