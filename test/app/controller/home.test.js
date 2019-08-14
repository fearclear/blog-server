'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {
  it('项目名称检查', function*() {
    const pkg = require('../../../package.json')
    assert(app.config.keys.startsWith(`${pkg.name}`))
  })

  it('检查ctx数据正常获取', () => {
    const ctx = app.mockContext({
      user: {
        name: 'admin'
      }
    })
    assert(ctx.user.name === 'admin')
  })

  it('首页跳转重定向', () => {
    return app
      .httpRequest()
      .get('/')
      .expect(301)
  })
})
