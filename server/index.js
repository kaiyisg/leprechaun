const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 5000

require('./app')(io, app)

app.listen(port, () => console.log(`Listening on port ${port}`))

// io.on('connection', (socket) => {})
