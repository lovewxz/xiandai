'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
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

  router.get(
    `${app.config.apiPrefix}/upload/token`,
    controller.upload.getUploadToken
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
    controller.classContent
  )

  router.resources(
    'doctor',
    `${app.config.apiPrefix}/doctor`,
    controller.doctor
  )

  router.resources('case', `${app.config.apiPrefix}/case`, controller.case)

  router.resources(
    'project',
    `${app.config.apiPrefix}/project`,
    controller.project
  )

  router.resources('news', `${app.config.apiPrefix}/news`, controller.news)

  router.resources('index', `${app.config.apiPrefix}/index`, controller.index)
}
