'use strict'

const Controller = require('egg').Controller

class WebController extends Controller {
  async home() {
    await this.ctx.render('home')
  }
  async form() {
    await this.ctx.render('form')
  }
}

module.exports = WebController
