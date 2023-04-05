/* eslint-disable global-require */
const ioEvents = require("./ioEvents");

const init = (server) => {
  var io = require("socket.io")(server);
  ioEvents(io);
  return io;
};

module.exports = init;
