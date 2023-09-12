import { createServer } from "http";
import { Server } from "socket.io";
import * as fs from "fs";
import path from "path"
import { fileURLToPath } from "url";
import * as rl from "readline"
var chart;
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

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
      var r = rl.createInterface({
        input : fs.createReadStream(file)
      })
      r.on('line', function (text) {
        console.log(text)
      })
      fs.writeFile(__dirname + "/tmp/upload/chart.txt", file, (err) => {
        callback({ message: err ? "failure" : "success" });
      });
      
    });
});
rl.
io.listen(3000)