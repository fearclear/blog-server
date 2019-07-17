'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {

  constructor(props) {
    super(props)
    this.rule = this.ctx.helper.rule.userRule
    this.salt = this.ctx.helper.salt
  }


  async status() {
    // console.log(this.ctx.model.user)
  }

  async signin() {
    const { userName, password } = this.ctx.request.body
    await this.ctx.validator(this.rule.signInRule, this.ctx.request.body)
    const user = await this.ctx.service.user.get({ userName, password })
    if(!user.length) {
      this.ctx.body = {
        text: '用户名不存在',
        status: 400
      }
      return
    }
    const userInfo = user[0]
    if(this.salt(userInfo.nickName, password) === userInfo.password) {
      delete userInfo.password
      this.ctx.body = {
        ...userInfo
      }
    }else {
      this.ctx.body = {
        text: '密码错误',
        status: 400
      }
    }
    this.ctx.rotateCsrfSecret()
  }

  async signup() {
    const user = this.ctx.request.body
    const { email, nickName, password } = user
    await this.ctx.validator(this.rule.signUpRule, user)
    const userInfo = await this.ctx.service.user.getUser({ email })
    if(!userInfo.length) {
      const params = {
        email,
        nickName
      }
      params.password = this.salt(nickName, password)
      const result = await this.ctx.service.user.addUser(params)
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

  async create() {
    const user = this.ctx.request.body
    await this.ctx.validator(this.rule.signUpRule, user)
    const result = await this.ctx.service.user.add(user)
    this.ctx.body = {
      result
    }
  }

}

module.exports = UserController

