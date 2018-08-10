'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async index() {
    this.ctx.body = 'index'
  }

  async create() {
    const user = this.ctx.request.body
    if(!user.email) {
      this.ctx.body = {
        text: '请输入邮箱',
        status: 400
      }
      return
    }
    if(!user.nickName) {
      this.ctx.body = {
        text: '请输入昵称',
        status: 400
      }
    }
    if(!user.password) {
      this.ctx.body = {
        text: '请输入密码',
        status: 400
      }
    }
    const result = await this.ctx.service.user.addUser(user)
    this.ctx.body = {
      result
    }
  }

  async show() {
    this.ctx.body = 'show'
  }

  async update() {
    this.ctx.body = 'update'
  }

  async destroy() {
    this.ctx.body = 'delete'
  }

}

module.exports = UserController

