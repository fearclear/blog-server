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

  async checkNickName() {
    const { nickName } = this.ctx.request.query
    const user = await this.ctx.service.user.getUserByNickName(nickName)
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
    const { email, nickName, password } = user
    await this.ctx.validator(this.rule.signUpRule, user)
    const emailCheck = await this.ctx.service.user.getUserByMail(email)
    if(emailCheck) {
      this.ctx.body = {
        text: '邮箱已存在',
        status: 401
      }
      return
    }
    const nickNameCheck = await this.ctx.service.user.getUserByNickName(nickName)
    if(nickNameCheck) {
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
      nickName,
      role: ''
    }
    params.password = await this.bhash(password)
    const result = await this.ctx.service.user.add(params)
    this.ctx.body = {
      result
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

}

module.exports = UserController

