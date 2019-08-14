'use strict'

const Controller = require('egg').Controller

class WebController extends Controller {
  async home() {
    await this.ctx.render('home')
  }
  async signin() {
    await this.ctx.render('signin')
  }
  async signup() {
    await this.ctx.render('signup')
  }
}

module.exports = WebController
