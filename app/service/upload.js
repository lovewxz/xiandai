'use strict'

const Service = require('egg').Service
const Qiniu = require('../utils/qiniu')

class UserService extends Service {
  getUploadToken() {
    const { app } = this
    const qiniu = new Qiniu(app.config.qiniu)
    const token = qiniu.uptoken()
    return token
  }
}

module.exports = UserService
