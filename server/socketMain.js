// where socket.io listeners and most emitters will be here

const socketMain = (io) => {
  io.on("connection", (socket) => {
    console.log(`Someone connected on worker ${process.pid}`);
    socket.emit("welcome", "Welcome to cluster driver socket.io server.");
  });
};

module.exports = socketMain;
