let io

const startSocket = (server) => {
  const socket = require('socket.io')(server)

  console.log('socket listening on server')
  return socket
}

module.exports = {
  startSocket,
  io,
}
