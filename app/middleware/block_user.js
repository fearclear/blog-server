'use strict'

module.exports = () => {
  return async function blockUser(ctx, next) {
    if(ctx.user && ctx.user.is_blocked) {
      ctx.body = {
        text: '您已被管理员屏蔽了，有疑问请联系fearcleari@gmail.com',
        status: 403
      }
      return
    }
    await next()
  }
}
