'use strict'

module.exports = () => {
  return async function checkPermission([ ...permission ], ctx, next) {
    /**
     * 无用户或用户权限
     */
    if(!ctx.user) {
      ctx.body = {
        status: 403,
        text: '没有权限'
      }
      return
    }
    /**
     * 用户多权限;分隔
     */
    const role = ctx.user.role.split(';')
    const roleFlag = role.some(i => ~permission.indexOf(i))
    if(!roleFlag) {
      ctx.body = {
        status: 403,
        text: '没有权限'
      }
      return
    }
    await next()
  }
}
