'use strict'

const Service = require('egg').Service

class UserService extends Service {

  async getUserById(id) {
    return await this.app.mysql.get('users', { id })
  }

  async getUserByMail(email) {
    return await this.app.mysql.get('users', { email })
  }

  async getUserByuserName(userName) {
    return await this.app.mysql.get('users', { userName })
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
