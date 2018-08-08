'use strict'

const Service = require('egg').Service

class UserService extends Service {
  async getUser(payload) {
    payload = payload || {}
    payload.userName = payload.email || payload.nickName || payload.userName
    return await this.app.mysql.query('SELECT * FROM blog_users WHERE email = ? OR nickName = ?', [ payload.userName, payload.userName ])
  }
  async addUser(payload) {
    return await this.app.mysql.insert('blog_users', payload)
  }
  async deleteUser(payload) {
    return await this.app.mysql.delete('blog_users', payload)
  }
  async updateUser(payload) {
    return await this.app.mysql.updateUser('blog_users', payload)
  }
}

module.exports = UserService
