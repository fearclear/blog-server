'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async index() {
    this.ctx.body = 'index'
  }

  async create() {
    this.ctx.body = 'create'
  }

  async show() {
    this.ctx.body = 'show'
  }

  async update() {
    this.ctx.body = 'update'
  }

  async destroy() {
    this.ctx.body = 'delete'
  }

}

module.exports = UserController

