module.exports = (io, app) => {
  const express = require('express')
  const path = require('path')
  const moment = require('moment')

  const { data } = require('./data')
  const { NUMBER } = require('./config')
  const twizo = require('./twizo')

  let twizoInstance = twizo.testTwizo
  if (process.env.NODE_ENV === 'production') {
    twizoInstance = twizo.realTwizo
  }

  const clockIn = () => {
    io.emit('clockin', {
      phoneNumber: NUMBER,
      startTime: moment().format('ddd, MMM DD, h:mm:ss a'),
    })
  }

  // API calls
  app.get('/api/register', async (req, res, next) => {
    try {
      await twizo.registerBioVoice(twizoInstance, NUMBER)
      await twizo.pollBioVoiceRegistration(next, twizoInstance, NUMBER)
    } catch (err) {
      console.error(err)
      console.log(err)
      return next(err)
    }
    return res.send('registered')
  })

  app.get('/api/register/check', async (req, res, next) => {
    try {
      const response = await twizoInstance.get(
        `/biovoice/subscription/${NUMBER}`,
      )
      console.log(response.data)
    } catch (err) {
      return next(err)
    }
    return res.send('ok!')
  })

  app.get('/api/verify', async (req, res, next) => {
    let ok
    try {
      const messageId = await twizo.verifyByBioVoice(twizoInstance, NUMBER)
      console.log('Now verifying...')
      ok = await twizo.pollBioVoiceVerification(next, twizoInstance, messageId)
    } catch (err) {
      console.log('FAILED', err)
      res.status(500)
      return res.send(err)
    }
    clockIn()
    if (ok) {
      return res.send('verified!')
    }
    return res.send('failed!')
  })

  app.get('/api/clockin', async (req, res) => {
    clockIn()
    return res.send('ok')
  })

  app.get('/api/delete', async (req, res, next) => {
    try {
      await twizoInstance.delete(`/biovoice/subscription/${NUMBER}`)
    } catch (err) {
      return next(err)
    }
    return res.send('deleted!')
  })

  app.get('/api/payroll', async (req, res, next) => {
    return res.send(data)
  })

  app.get('/api/version', async (req, res) => {
    return res.send('v1.0')
  })

  if (process.env.NODE_ENV === 'production') {
    console.log('prod')
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')))

    // Handle React routing, return all requests to React app
    app.get('/', function(req, res) {
      console.log('halp')
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
  }
}
