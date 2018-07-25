'use strict'

const Controller = require('egg').Controller

class ArticleController extends Controller {
  async signIn() {
    this.ctx.body = 'signIn'
  }
}

module.exports = ArticleController
