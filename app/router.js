'use strict'

/**
 * @param {Egg.Application} app - egg application
*/
module.exports = app => {
  const { router, controller } = app
  // router.redirect('/', '/home')
  // router.get('/index', controller.home.index)
  router.get('/test', controller.home.test)
  require('./router/home')(app)
  require('./router/sign')(app)
  require('./router/user')(app)
}

