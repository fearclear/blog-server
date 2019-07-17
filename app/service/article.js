'use strict'

const Service = require('egg').Service

class ArticleService extends Service {
  async get() {
    return await this.app.mysql.get()
  }
}

module.exports = ArticleService
