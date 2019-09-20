'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/home', controller.web.home)
  router.get('/signin', controller.web.signin)
  router.get('/signup', controller.web.signup)
  router.get('/article', controller.web.article)
}
