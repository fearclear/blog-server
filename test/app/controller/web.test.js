'use strict'

const { app } = require('egg-mock/bootstrap')

describe('test/app/controller/web.test.js', () => {
  it('render home', async() => {
    return await app.httpRequest()
      .get('/home')
      .expect(200)
  })
  it('render singnup', async() => {
    return await app.httpRequest()
      .get('/signup')
      .expect(200)
  })
  it('render signin', async() => {
    return await app.httpRequest()
      .get('/signin')
      .expect(200)
  })
  it('render article', async() => {
    return await app.httpRequest()
      .get('/article')
      .expect(200)
  })
})
