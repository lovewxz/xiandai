'use strict'

const Controller = require('egg').Controller

class CaseDoctorController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createCaseDoctorTransfer = {
      case_id: { type: 'int', require: true, allowEmpty: false },
      doctor_id: { type: 'int', require: true, allowEmpty: false }
    }
  }
  async index() {
    const { ctx } = this
    const res = await ctx.service.caseDoctor.index()
    ctx.helper.success({ ctx, res })
  }
  async create() {
    const { ctx } = this
    ctx.validate(this.createCaseDoctorTransfer)
    const params = ctx.request.body || {}
    const res = await ctx.service.caseDoctor.create(params)
    ctx.helper.success({ ctx, res })
  }
  async update() {
    const { ctx } = this
    ctx.validate(this.createCaseDoctorTransfer)
    const params = ctx.request.body || {}
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.caseDoctor.update(params, id)
    ctx.helper.success({ ctx, res })
  }
  async destroy() {
    const { ctx } = this
    const { id } = ctx.params
    if (!id) {
      ctx.throw('404', 'id不存在')
    }
    const res = await ctx.service.caseDoctor.destroy(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = CaseDoctorController
