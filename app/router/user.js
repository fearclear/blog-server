'use strict'

module.exports = app => {
  const { router, controller } = app
  const user = router.namespace('/blog/api/user')
  user.resources('user', '/', controller.user)
}
