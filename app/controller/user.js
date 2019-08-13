'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {

  constructor(props) {
    super(props)
    this.rule = this.ctx.helper.rule.userRule
    this.bhash = this.ctx.helper.bhash
    this.bcompare = this.ctx.helper.bcompare
    this.generateToken = this.ctx.helper.generateToken
    this.decodeToken = this.ctx.helper.decodeToken
  }

  async signin() {
    const { userName, password } = this.ctx.request.body
    await this.ctx.validator(this.rule.signInRule, this.ctx.request.body)

    const getUser = userName => {
      if(~userName.indexOf('@')) {
        return this.ctx.service.user.getUserByMail(userName)
      }
      return this.ctx.service.user.getUserByNickName(userName)
    }

    const exitUser = await getUser(userName)

    if(!exitUser) {
      this.ctx.body = {
        text: '用户名不存在',
        status: 401
      }
      return
    }

    const equal = await (this.bcompare(password, exitUser.password))

    if(!equal) {
      this.ctx.body = {
        text: '密码错误',
        status: 401
      }
      return
    }

    delete exitUser.password

    // 如果用户存在并且密码正确，则生成JWT token来获取用户信息，这里只写入了id
    const token = this.generateToken({
      id: exitUser.id,
      role: exitUser.role
    })

    exitUser.token = token

    this.ctx.body = {
      ...exitUser
    }
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
      params.password = this.bhash(password)
      const result = await this.ctx.service.user.addUser(params)
      this.ctx.body = {
        result
      }
      return
    }
    this.ctx.body = {
      text: '用户名已存在',
      status: 401
    }
  }

  async signFail() {
    this.ctx.body = {
      text: '登录失败',
      status: 401
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

