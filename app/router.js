'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.userAccess.create)
  router.post('/userAccess/login', controller.userAccess.login)
  router.post('/userAccess/logout', controller.userAccess.logout)
  router.get('/user/info', app.jwt, controller.user.getUserById)
}
