'use strict'

module.exports = () => {
  // 验证用户是否登录
  return async function(ctx, next) {
    ctx.user = null
    const token = ctx.get('x-blog-token')
    if(token) {
      const userId = await ctx.helper.decodeToken(token)
      if(userId) {
        const userInfo = await ctx.service.user.getUserById(userId)
        delete userInfo.password
        ctx.user = userInfo
      }else {
        ctx.body = {
          status: 403,
          text: '登录过期，请重新登录'
        }
      }
    }
    await next()
  }
}
