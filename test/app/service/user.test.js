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

  it('新增用户', async() => {
    const params = {
      id: '33',
      email: 'vv@qq.com',
      userName: 'vv',
      password: '123',
      createTime: new Date(),
      role: ''
    }
    const result = await ctx.service.user.add(params)
    assert(result.affectedRows)
  })

  it('锁定用户', async() => {
    const params = {
      id: '33',
      is_blocked: true
    }
    const result = await ctx.service.user.update(params)
    assert(result.affectedRows)
  })

  it('更新用户信息', async() => {
    const params = {
      id: '33',
      email: 'vva@qq.com',
      userName: 'vva',
      password: '123',
      createTime: new Date(),
      role: 'vv'
    }
    const result = await ctx.service.user.update(params)
    assert(result.affectedRows)
  })
})
