import { createServer } from "http";
import { Server } from "socket.io";
import { writeFile } from "fs";
var chart;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  },
});
io.on("connection", (socket) => {
    console.log("connected!!!")
    socket.on("upload", (file, callback) => {
      console.log(file)

      writeFile("./tmp/upload", file, (err) => {
        callback({ message: err ? "failure" : "success" });
      });
    });
});
io.listen(3000)