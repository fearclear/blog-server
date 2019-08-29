'use strict'

const Service = require('egg').Service

class ArticleService extends Service {
  async add(article) {
    return await this.app.mysql.insert('article', article)
  }

  async getArticleById(id) {
    return await this.app.mysql.get('article', { id })
  }

  async list(options) {
    return await this.app.mysql.select('article', options)
  }

  async count() {
    return await this.app.mysql.count('article')
  }

  async update(data) {
    return await this.app.mysql.update('article', data)
  }

}

module.exports = ArticleService
