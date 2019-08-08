'use strict'

module.exports = app => {
  app.messenger.on('xxx_action', data => {
    // ...
    console.log(data, 'data')
  })
  app.messenger.once('egg-ready', () => {
    // app.messenger.sendToAgent('agent-event', { foo: 'bar' })
    app.messenger.sendToApp('app-event', { foo: 'bar1' })
  })
}

