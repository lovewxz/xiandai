'use strict'

// had enabled by egg
// exports.static = true;

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}

exports.validate = {
  enable: true,
  package: 'egg-validate'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}
