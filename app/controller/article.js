'use strict'
const Controller = require('egg').Controller

class ArticleController extends Controller {
  async create() {
    const { title, detail } = this.ctx.request.body
    const user = this.ctx.user
    const data = {
      title,
      detail,
      userId: user.id,
      author: user.userName,
      createTime: new Date(),
      updateTime: new Date()
    }
    await this.ctx.service.article.add(data)
    this.ctx.body = {
      text: '创建成功'
    }
  }

  async detail() {
    const { id } = this.ctx.query
    const result = await this.ctx.service.article.getArticleById(id)
    this.ctx.body = result
  }

  async list() {
    const { pageIndex, pageSize } = this.ctx.query
    const options = {
      limit: pageSize || 10,
      offset: pageSize && pageIndex ? pageSize * (pageIndex - 1) : 0
    }
    const list = await this.ctx.service.article.list(options)
    const total = await this.ctx.service.article.count()
    this.ctx.body = {
      list,
      total
    }
  }

  async del() {
    const { id } = this.ctx.query
    const result = await this.ctx.service.article.del(id)
    if(result.affectedRows) {
      this.ctx.body = {
        text: '删除成功'
      }
    }else {
      this.ctx.body = {
        status: 400,
        text: '删除失败，请稍后重试'
      }
    }

  }

}

module.exports = ArticleController
