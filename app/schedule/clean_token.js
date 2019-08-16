'use strict'
const Subscription = require('egg').Subscription
const moment = require('moment')

class CleanToken extends Subscription {
  static get schedule() {
    return {
      interval: '10s',
      type: 'all'
    }
  }

  async subscribe() {
    const { ctx } = this
    const block_tokens = await ctx.app.redis.keys('*')
    block_tokens.forEach(i => {
      const token = ctx.helper.decodeToken(i)
      if(token.exp < moment().unix()) {
        ctx.app.redis.delete(i)
      }
    })
  }
}

module.exports = CleanToken
