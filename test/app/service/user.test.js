'use strict'
const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/service/user.test.js', () => {
  let ctx
  const exitUser = {
    id: 'b9c02eb8-fa22-41f3-a788-24a7eb5e7ea8',
    email: 'admin@gmail.com',
    userName: 'admin'
  }
  before(() => {
    ctx = app.mockContext()
  })
  it('获取用户列表', async() => {
    const userList = await ctx.service.user.getUserList()
    assert(userList && userList.length)
  })

  it('getUserById', async() => {
    const user = await ctx.service.user.getUserById(exitUser.id)
    assert(user.id === exitUser.id)
  })

  it('getUserByMail', async() => {
    const user = await ctx.service.user.getUserByMail(exitUser.email)
    assert(user.id === exitUser.id)
  })

  it('getUserByuserName', async() => {
    const user = await ctx.service.user.getUserByuserName(exitUser.userName)
    assert(user.id === exitUser.id)
  })

  it('更新用户信息', async() => {
    const params = {
      id: '92ed3732-f87e-4640-8246-7c90fda0ee44',
      email: 'cc@gmail.com',
      userName: 'cc',
      password: '123',
      createTime: new Date(),
      role: 'vv'
    }
    const result = await ctx.service.user.update(params)
    assert(result.affectedRows)
  })
})
