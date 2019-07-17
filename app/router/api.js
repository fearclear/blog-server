'use strict'

module.exports = app => {
  const { router, controller } = app
  const api = router.namespace('/blog/api')
  const localStrategy = app.passport.authenticate('local')
  console.log(localStrategy)

  // home page
  api.post('/signIn', controller.user.signin)
  api.post('/signUp', controller.user.signup)
}
