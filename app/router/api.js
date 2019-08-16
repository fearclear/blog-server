'use strict'

module.exports = app => {
  const { router, controller, middleware, config } = app
  const { permission } = config
  const api = router.namespace('/blog/api')

  // 权限认证
  const checkPermission = middleware.checkPermission()

  // home page
  api.post('/signIn', controller.user.signin)
  api.post('/signUp', controller.user.signup)
  api.get('/signFail', controller.user.signFail)
  api.get('/checkUser', controller.user.checkUserName)
  api.get('/checkEmail', controller.user.checkEmail)


  // article
  api.post('/create', checkPermission.bind(null, [ permission.admin, permission.tourist ]), controller.article.create)
}
