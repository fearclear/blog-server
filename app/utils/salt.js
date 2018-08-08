'use strict'

const md5 = require('md5')

module.exports = (salt, str) => {
  return md5(salt + str)
}
