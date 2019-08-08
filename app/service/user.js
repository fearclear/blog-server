'use strict'

const Service = require('egg').Service

class UserService extends Service {
  async get(user) {
    user = user || {}
    user.userName = user.email || user.nickName || user.userName
    return await this.app.mysql.query('SELECT * FROM users WHERE email = ? OR nickName = ?', [ user.userName, user.userName ])
  }

  async getUserByMail(email) {
    return await this.app.mysql.get('users', { email })
  }

  async getUserByNickName(nickName) {
    return await this.app.mysql.get('users', { nickName })
  }

  async add(user) {
    return await this.app.mysql.insert('users', user)
  }
  async destroy(user) {
    return await this.app.mysql.delete('users', user)
  }
  async update(user) {
    return await this.app.mysql.update('users', user)
  }
}

module.exports = UserService
