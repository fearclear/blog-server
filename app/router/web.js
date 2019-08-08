'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/home', controller.web.home)
  router.get('/form', controller.web.form)
}
