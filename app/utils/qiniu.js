'use strict'
const qiniu = require('qiniu')
class Qiniu {
  constructor(config) {
    this.AK = config.AK
    this.SK = config.SK
    this.bucket = config.bucket
    this.mac = new qiniu.auth.digest.Mac(config.AK, config.SK)
  }
  // 获取上传的token凭证
  uptoken() {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: this.bucket
    })
    const upToken = putPolicy.uploadToken(this.mac)
    return {
      upToken
    }
  }
}

module.exports = Qiniu
