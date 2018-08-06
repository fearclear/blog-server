'use strict'

module.exports = appInfo => {
  const config = exports = {}

  exports.cluster = {
    listen: {
      port: 3000
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_17463812930874_1837'

  // add your config here
  config.middleware = [ 'gzip' ]

  config.gzip = {
    threshold: 1024
  }

  // CSRF
  config.security = {
    csrf: {
      enable: false,
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
