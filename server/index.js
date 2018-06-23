const express = require('express')
const path = require('path')
const { startSocket } = require('./socket')
const { data } = require('./data')

const app = express()
const port = process.env.PORT || 5000

const twizo = require('./twizo')

const NUMBER = '6596700794'
// const NUMBER = '6596701794'
// const twizoInstance = twizo.testTwizo
const twizoInstance = twizo.realTwizo

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
    await twizo.pollBioVoiceRegistration(next, twizoInstance, NUMBER)
  } catch (err) {
    console.error(err)
    console.log(err)
    return next(err)
  }
  return res.send('registered')
})

app.get('/api/verify', async (req, res, next) => {
  try {
    const messageId = await twizo.verifyByBioVoice(twizoInstance, NUMBER)
    console.log(messageId)
    await twizo.pollBioVoiceVerification(next, twizoInstance, messageId)
  } catch (err) {
    console.error(err)
    console.log(err)
    return next(err)
  }
  return res.send('verified!', messageId)
})

app.get('/api/payroll', async (req, res, next) => {
  console.log('returning the payroll')
  return res.send(data)
})

// app.get('/api/verify/check', async (req, res, next) => {
//   try {
//     const messageId = await twizo.verifyByBioVoice(twizoInstance, NUMBER)
//     await twizo.pollBioVoiceVerification(next, twizoInstance, messageId)
//   } catch (err) {
//     console.error(err)
//     console.log(err)
//     return next(err)
//   }
//   return res.send('verified!')
// })

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
