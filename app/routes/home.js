'use strict'

module.exports = app => {
  const { router } = app
  router.use('/home', function(a, b, c) {
    console.log(a, b, c)
  })
}

