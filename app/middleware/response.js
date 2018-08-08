'use strict'

module.exports = () => {
  return async function response(ctx, next) {
    await next()
    let body = ctx.body
    if(body) {
      ctx.status = body.status ? body.status : 200
      if(body instanceof Array) {
        body = {
          list: body
        }
      }
      if(ctx.status === 200) {
        body = {
          success: true,
          ...body
        }
      }else {
        body = {
          success: false,
          text: body.text
        }
      }
      ctx.body = body
    }
  }
}

