'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.userAccess.create)
  router.post(
    `${app.config.apiPrefix}/userAccess/login`,
    controller.userAccess.login
  )
  router.post(
    `${app.config.apiPrefix}/userAccess/logout`,
    controller.userAccess.logout
  )
  router.get(
    `${app.config.apiPrefix}/user/info`,
    app.jwt,
    controller.user.getUserById
  )

  router.resources(
    'channel',
    `${app.config.apiPrefix}/channel`,
    controller.channel
  )

  router.resources(
    'contentClass',
    `${app.config.apiPrefix}/contentClass`,
    controller.contentClass
  )

  router.resources(
    'classContent',
    `${app.config.apiPrefix}/classContent`,
    controller.contentClass
  )

  router.resources(
    'doctor',
    `${app.config.apiPrefix}/doctor`,
    controller.contentClass
  )
}
