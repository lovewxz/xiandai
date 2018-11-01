'use strict'

const Controller = require('egg').Controller

class DoctorController extends Controller {
  async index() {
    const { ctx } = this
    const { settings, projectContent } = ctx.params
    const list = await ctx.service.doctor.index({})
    await ctx.render('doctor.ejs', { settings, projectContent, list })
  }
  async edit() {
    const { ctx } = this
    const { settings, projectContent } = ctx.params
    const { id } = ctx.params
    const doctor = await ctx.service.doctor.getDoctorById(id)
    await ctx.render('article.ejs', { settings, projectContent, doctor })
  }
}

module.exports = DoctorController
