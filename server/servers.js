// socket.io server that will service both node & react clients
// entrypoint of the cluster adapter
// reference - https://github.com/socketio/socket.io-cluster-adapter

const cluster = require("cluster"); // makes it so we can use multiple threads and doesn't change the nature of node
const http = require("http");
const numCPUs = require("os").cpus().length;
const socketMain = require("./socketMain");

const {Server} = require("socket.io");
const {setupMaster, setupWorker} = require("@socket.io/sticky"); // sticky makes it so a client can find its way back to the correct worker
const {createAdapter, setupPrimary} = require("@socket.io/cluster-adapter"); // makes it so the primary node can emit to everyone

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // create an http server
  const httpServer = http.createServer();

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
  //   cluster.setupMaster({
  //     serialization: "advanced",
  //   });
  // Node.js > 16.0.0
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(3000); // listen on port 3000

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // use the cluster adapter
  io.adapter(createAdapter()); // change from default adapter

  // setup connection with the primary process
  setupWorker(io);

  // this is where emits and listeners happen.
  socketMain(io);
}
