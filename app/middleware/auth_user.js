'use strict'

module.exports = () => {
  // 验证用户是否登录
  return async function(ctx, next) {
    ctx.user = null
    const token = ctx.get('x-blog-token')
    if(token) {
      const extraInfo = ctx.helper.decodeToken(token)
      if(extraInfo) {
        ctx.user = extraInfo.data
      }
    }
    await next()
  }
}
