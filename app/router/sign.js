'use strict'

module.exports = app => {
  const { router, controller } = app
  const home = router.namespace('/blog/api/sign')
  home.post('/signIn', controller.sign.signIn)
  home.post('/signUp', controller.sign.signUp)
}
