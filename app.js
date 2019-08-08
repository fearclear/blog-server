'use strict'

module.exports = app => {

  // 处理用户信息
  app.passport.verify(async(ctx, { username, password }) => {
    const getUser = username => {
      if(~username.indexOf('@')) {
        return ctx.service.user.getUserByMail(username)
      }
      return ctx.service.user.getUserByNickName(username)
    }

    const exitUser = await getUser(username)

    if(!exitUser) {
      return null
    }

    const equal = await ctx.helper.bcompare(password, exitUser.password)
    if(!equal) {
      return null
    }

    return exitUser

  })
  app.passport.serializeUser(async(ctx, user) => {
    console.log(user, 'userNmae')

    return {
      user
    }
  })
  app.passport.deserializeUser(async(ctx, user) => {
    console.log(user, 'deserializeUser')
  })
  app.messenger.on('xxx_action', data => {
    // ...
    console.log(data, 'data')
  })
  app.messenger.once('egg-ready', () => {
    // app.messenger.sendToAgent('agent-event', { foo: 'bar' })
    app.messenger.sendToApp('app-event', { foo: 'bar1' })
  })
}

