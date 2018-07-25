'use strict'

/**
 * @param {Egg.Application} app - egg application
*/
module.exports = app => {
  const { router } = app
  router.redirect('/', '/home')
  require('./router/home')(app)
  require('./router/sign')(app)
  require('./router/user')(app)
  require('./router/article')(app)
}

