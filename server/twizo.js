const axios = require('axios')

const TEST_KEY = '5RX7BZX9R287D3d-hKCdg7t4rYxZJLqk7YvRTX4Skrb1zKQ_'
const REAL_KEY = 't2egHLRt2GjYT35T5mKaTAIYy7GzVvGYKjw5Mob31OSa6k7y'
const URL = 'https://api-asia-01.twizo.com'

export const testTwizo = axios.create({
  baseURL: URL,
  auth: { username: 'twizo', password: TEST_KEY },
})

export const realTwizo = axios.create({
  baseURL: URL,
  auth: { username: 'twizo', password: REAL_KEY },
})

export const registerBioVoice = (twizo, number) => {
  return twizo.post(`/biovoice/registration`, { recipient: number })
}

export const checkBioVoiceRegistration = (twizo, number) => {
  return twizo.get(`/biovoice/registration${number}`).then((response) => {
    console.log(response.data)
    return response.data.statusCode === 1
  })
}

export const verifyByBioVoice = (twizo, number) => {
  return twizo
    .post('/verification/submit', {
      recipient: number,
      type: 'biovoice',
    })
    .then((response) => {
      console.log(response.data)
      return response.data.messageId
    })
}

export const checkBioVoiceVerification = (twizo, messageId) => {
  return twizo.get(`/verification/submit/${messageId}`).then((response) => {
    console.log(response.data)
    return response.data.statusCode === 1
  })
}
