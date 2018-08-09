'use strict'

module.exports = app => {
  const { router, controller } = app
  const home = router.namespace('/home')
  home.get('/', controller.home.index)
}
