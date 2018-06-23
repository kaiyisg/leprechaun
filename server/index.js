const express = require('express')
const path = require('path')
const { startSocket } = require('./socket')

const app = express()
const port = process.env.PORT || 5000

const twizo = require('./twizo')

const NUMBER = '6596700794'
const twizoInstance = twizo.testTwizo

// API calls
app.get('/api/register', (req, res, next) => {
  try {
    await twizo.registerBioVoice(twizoInstance, NUMBER)
    await twizo.pollBioVoiceRegistration(twizoInstance, NUMBER)
  } catch (err) {
    console.error(err)
    console.log(err)
    return next(err)
  }
  return res.send('registered')
})

app.get('/api/verify', (req, res, next) => {
  try {
    const messageId = await twizo.verifyByBioVoice(twizoInstance, NUMBER)
    await twizo.pollBioVoiceVerification(twizoInstance, messageId)
  } catch (err) {
    console.error(err)
    console.log(err)
    return next(err)
  }
  return res.send('verified!')
})

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
