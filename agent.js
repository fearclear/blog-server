'use strict'

module.exports = agent => {
  agent.messenger.on('egg-ready', () => {
    console.log('agent ready')
  })
  agent.messenger.on('agent-event', data => {
    agent.messenger.sendToApp('xxx_action', data)
  })
}
