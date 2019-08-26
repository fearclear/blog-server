'use strict'
const uuid = require('uuid')

const Controller = require('egg').Controller

class UserController extends Controller {

  constructor(props) {
    super(props)
    this.rule = this.ctx.helper.rule.userRule
    this.bhash = this.ctx.helper.bhash
    this.bcompare = this.ctx.helper.bcompare
    this.generateToken = this.ctx.helper.generateToken
  }

  async signin() {
    const { userName, password } = this.ctx.request.body
    try {
      await this.ctx.validator(this.rule.signInRule, this.ctx.request.body)
    } catch (error) {
      this.ctx.body = {
        status: 401,
        text: error.errors[0].message
      }
      return
    }
    const getUser = userName => {
      if(~userName.indexOf('@')) {
        return this.ctx.service.user.getUserByMail(userName)
      }
      return this.ctx.service.user.getUserByuserName(userName)
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

    // 如果用户存在并且密码正确，则生成token来获取用户信息，并删除之前的token
    const token = await this.generateToken({
      id: exitUser.id
    })

    exitUser.token = token

    this.ctx.body = {
      ...exitUser
    }
  }

  async checkEmail() {
    const { email } = this.ctx.request.query
    const user = await this.ctx.service.user.getUserByMail(email)
    if(user) {
      this.ctx.body = {
        text: '邮箱已存在',
        code: 1
      }
      return
    }
    this.ctx.body = {
      text: '邮箱可用',
      code: 0
    }
  }

  async checkUserName() {
    const { userName } = this.ctx.request.query
    const user = await this.ctx.service.user.getUserByuserName(userName)
    if(user) {
      this.ctx.body = {
        text: '用户名已存在',
        code: 1
      }
      return
    }
    this.ctx.body = {
      text: '用户名可用',
      code: 0
    }
  }

  async signup() {
    const user = this.ctx.request.body
    const { email, userName, password } = user
    try {
      await this.ctx.validator(this.rule.signUpRule, user)
    } catch (error) {
      this.ctx.body = {
        status: 401,
        text: error.errors[0].message
      }
      return
    }
    const emailCheck = await this.ctx.service.user.getUserByMail(email)
    if(emailCheck) {
      this.ctx.body = {
        text: '邮箱已存在',
        status: 401
      }
      return
    }
    const userNameCheck = await this.ctx.service.user.getUserByuserName(userName)
    if(userNameCheck) {
      this.ctx.body = {
        text: '用户名已存在',
        status: 401
      }
      return
    }
    const params = {
      id: uuid.v4(),
      createTime: new Date(),
      email,
      userName,
      role: ''
    }
    params.password = await this.bhash(password)
    await this.ctx.service.user.add(params)
    delete params.password
    this.ctx.body = params
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

}

module.exports = UserController

