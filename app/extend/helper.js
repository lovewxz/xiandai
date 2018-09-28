'use strict'

const bcrypt = require('bcrypt')

exports.createPassword = (password, saltRounds = 10) => {
  return bcrypt.hash(password, saltRounds)
}
