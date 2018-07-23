'use strict'

const Controller = require('egg').Controller

class SignController extends Controller {
  async signIn() {
    this.ctx.body = 'signIn'
  }
}

module.exports = SignController
