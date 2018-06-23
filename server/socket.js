const io = require("socket.io")();

const startSocket = () => {
  const socketPort = 8000;

  io.on("connection", client => {
    // here you can start emitting events to the client
  });

  io.listen(socketPort);
  console.log("socket listening on port ", socketPort);
};

module.exports = {
  startSocket
};
