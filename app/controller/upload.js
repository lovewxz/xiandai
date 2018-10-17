'use strict'

const Controller = require('egg').Controller

class UploadController extends Controller {
  getUploadToken() {
    const { ctx } = this
    const res = ctx.service.upload.getUploadToken()
    ctx.helper.success({ ctx, res })
  }
}

module.exports = UploadController
