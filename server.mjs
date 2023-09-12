import { createServer } from "http";
import { Server } from "socket.io";

var chart;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  },
});
io.on("connection", (socket) => {
    console.log("connected!!!")
    socket.on("chart send", (arg) => {
      console.log(arg)
    }) 
})
io.listen(3000)