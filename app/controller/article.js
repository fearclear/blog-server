'use strict'
const Controller = require('egg').Controller

class ArticleController extends Controller {
  async create() {
    const { title, detail } = this.ctx.request.body
    if(!title) {
      this.ctx.body = {
        status: 400,
        text: '请输入文章标题'
      }
      return
    }
    if(!detail) {
      this.ctx.body = {
        status: 400,
        text: '请输入文章内容'
      }
      return
    }
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
    if(!id) {
      this.ctx.body = {
        status: 400,
        text: '请输入文章id'
      }
      return
    }
    const params = {
      id,
      state: 3
    }
    const result = await this.ctx.service.article.update(params)
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

  async update() {
    const { id, title, detail } = this.ctx.request.body
    if(!id) {
      this.ctx.body = {
        status: 400,
        text: '请输入文章id'
      }
      return
    }
    if(!title) {
      this.ctx.body = {
        status: 400,
        text: '请输入文章标题'
      }
      return
    }
    if(!detail) {
      this.ctx.body = {
        status: 400,
        text: '请输入文章内容'
      }
      return
    }
    const data = {
      id,
      title,
      detail,
      updateTime: new Date()
    }
    const result = await this.ctx.service.article.update(data)

    if(result.affectedRows) {
      this.ctx.body = {
        text: '修改成功'
      }
    }else {
      this.ctx.body = {
        status: 400,
        text: '修改失败，请稍后重试'
      }
    }
  }

}

module.exports = ArticleController
