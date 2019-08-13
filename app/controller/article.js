'use strict'

const Controller = require('egg').Controller

class ArticleController extends Controller {
  async create() {
    console.log(this.ctx)
  }
}

module.exports = ArticleController
