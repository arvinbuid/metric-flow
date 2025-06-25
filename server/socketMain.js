// where socket.io listeners and most emitters will be here
// socketMain is listening to port 3000

const socketMain = (io) => {
  io.on("connection", (socket) => {
    const auth = socket.handshake.auth;

    // join room if valid token
    if (auth.token === "nodeclienttoken") {
      socket.join("nodeClient");
      console.log("Connected to node client✅");
    } else if (auth.token === "reactclienttoken") {
      socket.join("reactClient");
      console.log("Connected to react client✅");
    } else {
      socket.disconnect();
      console.log("You have been disconnected. Invalid token🔐");
    }

    console.log(`Someone connected on worker ${process.pid}`);
    socket.emit("welcome", "Welcome to cluster driver socket.io server.");

    // listen to perfData event
    socket.on("perfData", (data) => {
      console.log("tick...");
      console.log(data);
      io.to("reactClient").emit("perfData", data);
    });
  });
};

module.exports = socketMain;
