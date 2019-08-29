'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/user.test.js', () => {

  it('登录规则错误', async() => {
    const params = {
      userName: '',
      password: '00'
    }
    return await app.httpRequest()
      .post('/blog/api/signIn')
      .send(params)
      .expect(401)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '请输入用户名')
      })
  })

  it('用户名不存在', async function() {
    const params = {
      userName: 'test',
      password: '00'
    }

    return await app.httpRequest()
      .post('/blog/api/signIn')
      .send(params)
      .expect(401)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '用户名不存在')
      })

  })

  it('密码错误', async function() {

    const params = {
      userName: 'fearcleari@gmail.com',
      password: '123'
    }

    return await app.httpRequest()
      .post('/blog/api/signIn')
      .send(params)
      .expect(401)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text = '密码错误')
      })

  })

  it('登录成功', async() => {
    const params = {
      userName: 'adm',
      password: '123'
    }

    return await app.httpRequest()
      .post('/blog/api/signIn')
      .send(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.id)
        assert(res.body.token)
      })

  })

  it('注册邮箱白名单验证', async() => {
    const params = {
      email: 'fe@fe.com',
      userName: 'adm',
      password: '123'
    }

    return await app.httpRequest()
      .post('/blog/api/signUp')
      .send(params)
      .expect(401)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '不支持的邮箱')
      })

  })

  it('注册邮箱重复', async() => {
    const params = {
      email: 'fearcleari@gmail.com',
      userName: 'ad',
      password: '123'
    }

    return await app.httpRequest()
      .post('/blog/api/signUp')
      .send(params)
      .expect(401)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '邮箱已存在')
      })

  })

  it('注册用户名重复', async() => {
    const params = {
      email: 'abcd@qq.com',
      userName: 'admin',
      password: '123'
    }

    return await app.httpRequest()
      .post('/blog/api/signUp')
      .send(params)
      .expect(401)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '用户名已存在')
      })

  })

  it('注册成功', async() => {
    const params = {
      email: 'abc@qq.com',
      userName: 'adminabc',
      password: '123123'
    }

    return await app.httpRequest()
      .post('/blog/api/signUp')
      .send(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
      })
  })

  it('检查邮箱已存在', async() => {
    const params = {
      email: 'fearcleari@gmail.com'
    }

    return await app.httpRequest()
      .get('/blog/api/checkEmail')
      .query(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.text === '邮箱已存在')
        assert(res.body.code === 1)
      })
  })

  it('邮箱可用', async() => {
    const params = {
      email: 'ccav@gamil.com'
    }

    return await app.httpRequest()
      .get('/blog/api/checkEmail')
      .query(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.code === 0)
      })
  })

  it('检查用户名已存在', async() => {
    const params = {
      userName: 'admin'
    }

    return await app.httpRequest()
      .get('/blog/api/checkUser')
      .query(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.text === '用户名已存在')
        assert(res.body.code === 1)
      })
  })

  it('用户名可用', async() => {
    const params = {
      userName: 'hahaabc'
    }

    return await app.httpRequest()
      .get('/blog/api/checkUser')
      .query(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.code === 0)
      })
  })

})
