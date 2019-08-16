'use strict'
const moment = require('moment')

module.exports = () => {
  // 验证用户是否登录
  return async function(ctx, next) {
    ctx.user = null
    const token = ctx.get('x-blog-token')
    if(token) {
      const extraInfo = ctx.helper.decodeToken(token)
      if(extraInfo) {
        ctx.user = extraInfo.data
        const is_blocked = await ctx.app.redis.get(token)
        ctx.user.is_blocked = !!is_blocked
        if(extraInfo.exp - moment().unix() < 24 * 3600) {
          ctx.user.refresh = true
          ctx.app.redis.set(token, 1)
        }else {
          ctx.user.refresh = false
        }
      }
    }
    await next()
  }
}
