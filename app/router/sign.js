'use strict'

module.exports = app => {
  const { router, controller } = app
  const home = router.namespace('/sign')
  home.resouse()
  home.post('/signIn', controller.sign.signIn)
}
