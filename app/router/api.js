'use strict'

module.exports = app => {
  const { router, controller } = app
  const api = router.namespace('/blog/api')
  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/blog/api/signFail'
  })

  // home page
  api.post('/signIn', localStrategy)
  api.post('/signUp', controller.user.signup)
  api.get('/signFail', controller.user.signFail)
}
