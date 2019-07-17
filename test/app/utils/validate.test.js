'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('/test/app/utils/validate.test.js', () => {
  it('测试下', () => {
    assert(app.config.env && 1)
  })
})
