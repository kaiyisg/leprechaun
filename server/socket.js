const io = require("socket.io")();

const startSocket = () => {
  const socketPort = 8000;
  io.on("connection", client => {
    client.on("subscribeToTimer", interval => {
      console.log("client is subscribing to timer with interval ", interval);
    });
  });

  io.listen(socketPort);
  console.log("socket listening on port ", socketPort);
};

module.exports = {
  startSocket
};
