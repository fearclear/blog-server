'use strict'

const path = require('path')

module.exports = appInfo => {
  const config = exports = {}

  exports.cluster = {
    listen: {
      port: 3000,
      hostname: '127.0.0.1'
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531231790825_9819'

  // add your config here
  config.middleware = []

  // CSRF
  config.security = {
    csrf: {
      queryName: '_csrf',
      bodyName: '_csrf',
      headerName: 'x-fc-csrf',
      useSession: true,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken'
    }
  }

  config.view = {
    defaultExt: '.html',
    mapping: {
      '.html': 'nunjucks',
      '.nj': 'nunjucks'
    }
  }

  config.static = {
    prefix: '/blog',
    dir: path.join(appInfo.baseDir, 'app/public/blog')
  }

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'fearclear',
      password: 'HORIr6sndSD0xJMd',
      database: 'blog'
    },
    app: true,
    agent: false
  }

  return config
}
