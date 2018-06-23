import openSocket from 'socket.io-client'

const socket = openSocket(`http://localhost:8000`)

function subscribeClockin(cb) {
  socket.on('clockin', (data) => cb(null, data))
}

export { subscribeClockin }
