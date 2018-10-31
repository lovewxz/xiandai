'use strict'

const Controller = require('egg').Controller

class DoctorController extends Controller {
  async index() {
    const { ctx } = this
    const list = await ctx.service.doctor.index({})
    await ctx.render('doctor.ejs', list)
  }
  async edit() {
    const { ctx } = this
    const { id } = ctx.params
    const res = await ctx.service.doctor.getDoctorById(id)
    await ctx.render('article.ejs', res)
  }
}

module.exports = DoctorController
