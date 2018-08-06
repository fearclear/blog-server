'use strict'

const Controller = require('egg').Controller

class SignController extends Controller {
  async signIn() {
    const { userName, password } = this.ctx.request.body
    const user = await this.ctx.service.user.getUser({ userName, password })
    if(!user) {
      this.ctx.throw(403)
    }
    this.ctx.rotateCsrfSecret()
  }

  async signUp() {
    const data = this.ctx.request.body
    console.log(data)
    const { email, userName, password, repeatPassword } = data
    if(!email) {
      this.ctx.body = {
        text: '请输入邮箱',
        status: 400
      }
      this.ctx.status = 400
      return
    }
    if(!userName) {
      this.ctx.body = {
        text: '请输入用户名',
        status: 400
      }
      this.ctx.status = 400
      return
    }
    if(!password) {
      this.ctx.body = {
        text: '请输入密码',
        status: 400
      }
      this.ctx.status = 400
      return
    }
    if(password !== repeatPassword) {
      this.ctx.body = {
        text: '两次密码不一致',
        status: 400
      }
      this.ctx.status = 400
      return
    }
    const user = await this.ctx.service.user.getUser({ userName })
    console.log(user)
    if(!user) {
      const result = await this.ctx.service.user.addUser(data)
      this.ctx.bdoy = result
      this.ctx.status = 200
    }
    this.ctx.body = 'all'
    this.ctx.status = 200
  }

  async sendSMS() {
    console.log('send')
  }

}

module.exports = SignController
