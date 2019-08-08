'use strict'

module.exports = app => {
  const { router, controller } = app
  const api = router.namespace('/blog/api')

  // home page
  api.post('/signIn', controller.user.signin)
  api.post('/signUp', controller.user.signup)
  api.get('/signFail', controller.user.signFail)
}
