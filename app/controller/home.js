'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg'
    const client1 = await this.app.mysql.get('blog')
    console.log(client1, this.app)
  }
}

module.exports = HomeController
