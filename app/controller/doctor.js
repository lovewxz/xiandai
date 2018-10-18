'use strict'

const Controller = require('egg').Controller

class DoctorController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createDoctorTransfer = {
      channel_id: { type: 'int', require: true, allowEmpty: false },
      type_id: { type: 'int', require: true, allowEmpty: false },
      sub_title: { type: 'string', require: true, allowEmpty: false },
      introduction: { type: 'string', require: true, allowEmpty: false },
      content: { type: 'string', require: true, allowEmpty: false },
      hits: { type: 'int', require: true, allowEmpty: false },
      search_text: { type: 'string', require: true, allowEmpty: false },

      content_id: { type: 'int', require: true, allowEmpty: false },
      doctor_name: { type: 'string', require: true, allowEmpty: false },
      title: { type: 'string', require: true, allowEmpty: false },
      goods_project: { type: 'string', require: true, allowEmpty: false },
      appointment_count: { type: 'int', require: true, allowEmpty: false },
      up_hits: { type: 'int', require: true, allowEmpty: false },
      img_url: { type: 'string', require: true, allowEmpty: false },
      list_url: { type: 'string', require: true, allowEmpty: false }
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
}

module.exports = DoctorController
