const express = require('express')
const path = require('path')
const { startSocket, io } = require('./socket')
const moment = require('moment')
const { data } = require('./data')
const { NUMBER } = require('./config')

const app = express()
const port = process.env.PORT || 5000

const twizo = require('./twizo')
const twizoInstance = twizo.testTwizo
// const twizoInstance = twizo.realTwizo

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
    const response = await twizoInstance.get(`/biovoice/subscription/${NUMBER}`)
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
  if (ok) {
    clockIn()
    return res.send('verified!')
  }
  return res.send('failed!')
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
  clockIn()
  return res.send(data)
})

app.get('/api/verion', async (req, res) => {
  return res.send('v1.0')
})

const clockIn = () => {
  io.emit('clockin', {
    phoneNumber: NUMBER,
    startTime: moment().format('ddd, MMM DD, h:mm:ss a'),
  })
}

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))

startSocket()
