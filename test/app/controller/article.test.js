'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/article.test.js', () => {
  it('发布文章-缺少标题', async() => {
    const params = {
      detail: '内容'
    }
    return await app.httpRequest()
      .post('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '请输入文章标题')
      })
  })
  it('发布文章-缺少内容', async() => {
    const params = {
      title: '测试标题'
    }
    return await app.httpRequest()
      .post('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '请输入文章内容')
      })
  })
  it('发布文章', async() => {
    const params = {
      title: '测试标题',
      detail: '测试内容'
    }
    return await app.httpRequest()
      .post('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.text === '创建成功')
      })
  })

  it('修改文章-缺少id', async() => {
    const params = {
      title: '测试标题',
      detail: '测试详情upupup'
    }
    return await app.httpRequest()
      .put('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '请输入文章id')
      })
  })

  it('修改文章-缺少文章标题', async() => {
    const params = {
      id: 1,
      title: '',
      detail: ''
    }
    return await app.httpRequest()
      .put('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '请输入文章标题')
      })
  })

  it('修改文章-缺少文章内容', async() => {
    const params = {
      id: 1,
      title: 'title',
      detail: ''
    }
    return await app.httpRequest()
      .put('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '请输入文章内容')
      })
  })

  it('修改文章-修改失败', async() => {
    const params = {
      id: 199,
      title: 'title',
      detail: 'ccc'
    }
    return await app.httpRequest()
      .put('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '修改失败，请稍后重试')
      })
  })

  it('修改文章', async() => {
    const params = {
      id: 1,
      title: '测试标题',
      detail: '测试详情upupup'
    }
    return await app.httpRequest()
      .put('/blog/api/article')
      .set('x-blog-token', 'b155571b-7d7a-4fd2-b0fa-53c7d5836300')
      .send(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.text === '修改成功')
      })
  })

  it('删除文章-缺少id', async() => {
    const params = {}
    return await app.httpRequest()
      .delete('/blog/api/article')
      .query(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '请输入文章id')
      })
  })

  it('删除文章-错误id', async() => {
    const params = {
      id: 998
    }
    return await app.httpRequest()
      .delete('/blog/api/article')
      .query(params)
      .expect(400)
      .then(res => {
        assert(!res.body.success)
        assert(res.body.text === '删除失败，请稍后重试')
      })
  })

  it('删除文章', async() => {
    const params = {
      id: 65
    }
    return await app.httpRequest()
      .delete('/blog/api/article')
      .query(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.text === '删除成功')
      })
  })

  it('获取文章列表', async() => {
    const params = {}
    return await app.httpRequest()
      .get('/blog/api/article/list')
      .query(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
      })
  })

  it('获取文章详情', async() => {
    const params = {
      id: 1
    }
    return await app.httpRequest()
      .get('/blog/api/article')
      .query(params)
      .expect(200)
      .then(res => {
        assert(res.body.success)
        assert(res.body.id === 1)
      })
  })
})
