'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg'
    const client1 = await this.app.mysql.select('blog_users')
    console.log(client1)
  }

  // *test() {
  //   const result = yield this.app.mysql.get('blog_users', { id: 12 })
  //   console.log(result)
  //   return result
  // }
}

module.exports = HomeController
