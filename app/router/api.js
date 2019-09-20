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
  api.get('/checkUser', controller.user.checkUserName)
  api.get('/checkEmail', controller.user.checkEmail)

  // article
  api.post('/article', checkPermission.bind(null, [ permission.tourist ]), controller.article.create)
  api.get('/article', controller.article.detail)
  api.get('/article/list', controller.article.list)
  api.del('/article', controller.article.del)
  api.put('/article', controller.article.update)
}
