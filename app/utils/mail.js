'use strict'

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'qq',
  secureConnection: true, // use SSL
  port: 465, // port
  auth: {
    user: 'fearcleari@qq.com',
    pass: 'ueinsbfrtitgbghi'
  }
})

module.exports = mailOptions => {
  mailOptions = mailOptions ? mailOptions : {
    from: '"fearclear" <fearcleari@qq.com>', // login user must equel to this user
    to: '527085767@qq.com',
    subject: 'Title Nodejs Send',
    text: 'Some simple words.',
    html: '<b>The main content of the mail. You have successfully logged in to Nodejs.</b>'
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error, 'error')
      return console.log(error)
    }
    console.log('Message sent: ' + info.response)
  })
}
