'use strict'
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const nodemailer = require('nodemailer')
const MarkdownIt = require('markdown-it')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const private_config = require('../../config/private_config')

/** *************
 * moment 设置
 */
moment.locale('zh-cn')

/** *************
 * markdown 设置
 */
const md = new MarkdownIt()
md.set({
  html: false, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: false, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true // Enable smartypants and other sweet transforms
})

/** ***************
 * nodemailer设置
 */

const transporter = nodemailer.createTransport({
  service: 'qq',
  secureConnection: true, // use SSL
  port: 465, // port
  auth: private_config.mail.auth
})

/** ***************
 * 校验规则正则初始化
 */

// 邮箱白名单
const emailWhilelist = [ 'qq.com', 'gmail.com', '163.com', '126.com', 'msn.com', 'hotmail.com', 'googlemail.com', 'mail.com',
  'aol.com', 'ask.com', 'live.com', '263.net', '3721.net', 'yiah.net', 'yahoo.com', 'aim.com', 'walla.com', 'foxmail.com',
  'inbox.com', 'sina.com', '21cn.com', 'soh.com', 'yahoo.com.cn', 'tom.com', 'etang.com', 'eyou.com', '56.com', 'x.cn', 'sina.cn',
  'chinaren.com', 'sogou.com', 'citiz.com', 'hongkong.com', 'ctimail.com', 'mail.hk.com', 'hknet.com', 'swe.com.hk', 'seed.net.tw' ]

const emailPattern = new RegExp(`${emailWhilelist.join('|')}$`, 'i')
const namePattern = /^([A-Za-z0-9]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3])+(?:[_-]([A-Za-z0-9]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3])+)*$/

module.exports = {
  mail(mailOptions) {
    mailOptions = mailOptions ? mailOptions : {
      from: '"fearclear" <fearcleari@qq.com>', // login user must equel to this user
      to: '527085767@qq.com',
      subject: 'Title Nodejs Send',
      text: 'Some simple words.',
      html: '<b>The main content of the mail. You have successfully logged in to Nodejs.</b>'
    }
    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error, 'error')
        return console.log(error)
      }
      console.log('Message sent: ' + info.response)
    })
  },
  rule: {
    userRule: {
      signInRule: {
        userName: { required: true, message: '请输入用户名' },
        password: { required: true, message: '请输入密码' }
      },
      signUpRule: {
        email: [
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '邮箱类型错误' },
          { pattern: emailPattern, message: '不支持的邮箱' }
        ],
        nickName: [
          { required: true, message: '请输入昵称' },
          { pattern: namePattern, message: '请输入合法的用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      }
    }
  },
  bhash(salt) {
    return bcrypt.hash(salt, 10)
  },
  bcompare(salt, hash) {
    return bcrypt.compare(salt, hash)
  },
  generateToken(data) {
    const salt = fs.readFileSync(path.join(__dirname, '../RSAKEY/rsa_private_key.pem'))
    const token = jwt.sign({
      data,
      exp: moment().add(7, 'd').unix()
    }, salt, { algorithm: 'RS256' })
    return token
  },
  decodeToken(token) {
    const salt = fs.readFileSync(path.join(__dirname, '../RSAKEY/rsa_public_key.pem'))
    try {
      const data = jwt.verify(token, salt)
      return data
    } catch (error) {
      return null
    }
  }
}
