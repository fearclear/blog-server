'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/user.test.js', () => {
  it('登录', () => {
    const ctx = app.mockContext({
      userName: 'fearcleari@gmail.com',
      password: '123'
    })
  })
})
