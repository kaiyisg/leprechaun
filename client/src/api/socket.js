import openSocket from 'socket.io-client'

const socket = openSocket(window.location.toString())

function subscribeClockin(cb) {
  socket.on('clockin', (data) => cb(null, data))
}

export { subscribeClockin }
