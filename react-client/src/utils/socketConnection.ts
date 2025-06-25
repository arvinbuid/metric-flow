import {io} from "socket.io-client";

const options = {
  auth: {
    token: "reactclienttoken",
  },
};
const socket = io("http://localhost:3000", options);
socket.on("welcome", (data) => {
  console.log(data);
});

export default socket;
