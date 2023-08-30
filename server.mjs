import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});
io.on("connection", () => {
    console.log("connected!!!")
})
io.listen(3000)