'use strict'

module.exports = app => {
  const { router, controller } = app
  const home = router.namespace('/user')
  home.get('/', controller.home.index)
}
