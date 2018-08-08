'use strict'

const { salt } = require('../utils')

const Controller = require('egg').Controller

class SignController extends Controller {
  async signIn() {
    const { userName, password } = this.ctx.request.body
    const user = await this.ctx.service.user.getUser({ userName, password })
    if(!user) {
      this.ctx.body = {
        text: '用户名不存在',
        status: 400
      }
    }
    this.ctx.rotateCsrfSecret()
  }

  async signUp() {
    const data = this.ctx.request.body
    const { email, nickName, password, repeatPassword } = data
    if(!email) {
      this.ctx.body = {
        text: '请输入邮箱',
        status: 400
      }
      return
    }
    if(!nickName) {
      this.ctx.body = {
        text: '请输入昵称',
        status: 400
      }
      return
    }
    if(!password) {
      this.ctx.body = {
        text: '请输入密码',
        status: 400
      }
      return
    }
    if(password !== repeatPassword) {
      this.ctx.body = {
        text: '两次密码不一致',
        status: 400
      }
      return
    }
    delete data.repeatPassword
    const user = await this.ctx.service.user.getUser({ email })
    if(!user.length) {
      data.password = salt(nickName, password)
      const result = await this.ctx.service.user.addUser(data)
      this.ctx.body = {
        result
      }
      return
    }
    this.ctx.body = {
      text: '用户名已存在',
      status: 400
    }
  }

  async sendSMS() {
    console.log('send')
  }

}

module.exports = SignController
