'use strict'
const private_config = require('./private_config')

module.exports = appInfo => {
  const config = exports = {}

  config.cluster = {
    listen: {
      port: 7001
    }
  }

  config.name = private_config.name

  config.description = private_config.description

  config.debug = true

  config.session = {
    renew: true
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + private_config.appInfoKeys

  config.host = private_config.host

  config.session_secret = private_config.session_secret

  // add your config here
  config.middleware = [ 'response', 'authUser', 'blockUser' ]

  config.gzip = {
    threshold: 1024
  }

  // CSRF
  config.security = {
    csrf: {
      enable: false
    }
  }

  config.view = {
    defaultExtension: '.njk',
    mapping: {
      '.html': 'nunjucks',
      '.nj': 'nunjucks',
      '.njk': 'nunjucks',
      '.tpl': 'nunjucks'
    }
  }

  config.mysql = {
    client: private_config.mysql.client,
    app: true,
    agent: false
  }

  config.permission = {
    admin: 'admin',
    tourist: ''
  }

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '0'
    },
    agent: true
  }

  return config
}
