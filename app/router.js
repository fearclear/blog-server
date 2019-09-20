'use strict'

/**
 * @param {Egg.Application} app - egg application
*/
module.exports = app => {
  const { router } = app
  router.redirect('/', '/home')
  require('./router/web')(app)
  require('./router/api')(app)
}

