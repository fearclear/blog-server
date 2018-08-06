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
  *getUser(payload) {
    return yield this.app.mysql.query('blog_users', payload)
  }
  *addUser(payload) {
    return yield this.app.mysql.insert('blog_users', payload)
  }
  *deleteUser(payload) {
    return yield this.app.mysql.delete('blog_users', payload)
  }
  *updateUser(payload) {
    return yield this.app.mysql.updateUser('blog_users', payload)
  }
}

module.exports = UserService
