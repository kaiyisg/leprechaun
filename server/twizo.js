const axios = require('axios')

const TEST_KEY = '5RX7BZX9R287D3d-hKCdg7t4rYxZJLqk7YvRTX4Skrb1zKQ_'
const REAL_KEY = 't2egHLRt2GjYT35T5mKaTAIYy7GzVvGYKjw5Mob31OSa6k7y'
const URL = 'https://api-asia-01.twizo.com'

const testTwizo = axios.create({
  baseURL: URL,
  auth: { username: 'twizo', password: TEST_KEY },
})

const realTwizo = axios.create({
  baseURL: URL,
  auth: { username: 'twizo', password: REAL_KEY },
})

const registerBioVoice = (twizo, number) => {
  return twizo.post(`/biovoice/registration`, { recipient: number })
}

const checkBioVoiceRegistration = (twizo, number) => {
  return twizo.get(`/biovoice/registration/${number}`).then((response) => {
    return response.data.statusCode === 1
  })
}

const verifyByBioVoice = (twizo, number) => {
  return twizo
    .post('/verification/submit', {
      recipient: number,
      type: 'sms',
      // type: 'biovoice',
    })
    .then((response) => {
      return response.data.messageId
    })
}

const checkBioVoiceVerification = (twizo, messageId) => {
  return twizo
    .get(`/verification/submit/${messageId}?token=012345`)
    .then((response) => {
      return response.data.statusCode === 1
    })
}

const pollFunc = (next, func) => {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const timer = setInterval(async () => {
      try {
        console.log('current attempt: ', attempts)
        if (attempts > 20) {
          clearInterval(timer)
          return reject('More than 20 attempts')
        }
        const ok = await func()
        if (ok) {
          clearInterval(timer)
          return resolve(ok)
        }
        attempts++
      } catch (error) {
        next(error)
        clearInterval(timer)
        return reject(error)
      }
    }, 3000)
  })
}

const pollBioVoiceRegistration = (next, twizo, number) => {
  return pollFunc(next, () => checkBioVoiceRegistration(twizo, number))
}

const pollBioVoiceVerification = (next, twizo, messageId) => {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const timer = setInterval(async () => {
      try {
        console.log('current attempt: ', attempts)
        if (attempts > 20) {
          clearInterval(timer)
          return reject('More than 20 attempts')
        }
        const response = await twizo.get(
          `/verification/submit/${messageId}?token=012345`,
        )
        const code = response.data.statusCode
        console.log('code is: ', code)
        switch (code) {
          case 1:
            clearInterval(timer)
            return resolve(true)
          case 4:
            clearInterval(timer)
            return resolve(false)
          default:
            attempts++
        }
      } catch (error) {
        next(error)
        clearInterval(timer)
        return reject(error)
      }
    }, 3000)
  })
}

module.exports = {
  testTwizo,
  realTwizo,
  registerBioVoice,
  verifyByBioVoice,
  pollBioVoiceRegistration,
  pollBioVoiceVerification,
}
