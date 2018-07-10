'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531231790825_9819'

  // add your config here
  config.middleware = []

  return config
}

exports.mysql = {
  client: {
    host: 'http://127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    // user: 'fearclear',
    // password: 'URqbuBROtLdtdKtZ',
    database: 'blog',
  },
  app: true,
  agent: false,
}
