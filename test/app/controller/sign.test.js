'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/sign.test.js', () => {
  it('注册', () => {
    assert(true)
    return app
      .httpRequest()
      .post('/sign/signUp')
      .type('form')
      .send({
        userName: '123'
      })
      .expect(404)
  })
})

