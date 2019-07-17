'use strict'
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true
  }, (req, userName, password, done) => {
    // format user
    const user = {
      provider: 'local',
      userName,
      password
    }
    console.debug('%s %s get user: %j', req.method, req.url, user)
    app.passport.doVerify(req, user, done)
  }))

  // 处理用户信息
  app.passport.verify(async(ctx, user) => {
    console.log(user, 'verify')
  })
  app.passport.serializeUser(async(ctx, user) => {
    console.log(user, 'serializeUser')
  })
  app.passport.deserializeUser(async(ctx, user) => {
    console.log(user, 'deserializeUser')
  })
}

