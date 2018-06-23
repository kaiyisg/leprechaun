const io = require('socket.io')()
const socketPort = 8000

const startSocket = () => {
  io.on('connection', (client) => {
    client.on('clockin', (interval) => {
      console.log('clocking in ', interval)
      setInterval(() => {
        client.emit('timer', new Date())
      }, interval)
    })
  })

  io.listen(socketPort)
  console.log('socket listening on port ', socketPort)
}

module.exports = {
  startSocket,
}
