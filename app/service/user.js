'use strict'

const Service = require('egg').Service

class UserService extends Service {
  *index() {
    const client1 = yield this.app.mysql.query('blog_users')
    console.error(client1, 'client1')
    return {
      client1
    }
  }
}

module.exports = UserService
