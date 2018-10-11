'use strict'

const bcrypt = require('bcrypt')

exports.createPassword = (password, saltRounds = 10) => {
  return bcrypt.hash(password, saltRounds)
}

exports.comparePassword = (password, userPassword) => {
  return bcrypt.compare(password, userPassword)
}

exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 200,
    data: res,
    msg
  }
  ctx.status = 200
}
