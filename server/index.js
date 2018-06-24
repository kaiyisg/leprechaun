const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 5000

require('./app')(io, app)

server.listen(port, () => console.log(`Listening on port ${port}`))
