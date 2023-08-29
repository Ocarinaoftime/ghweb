import { readFileSync } from "fs";
import { createServer } from "https";
import { Server } from "socket.io";

const httpsServer = createServer({
  key: readFileSync("./cakey.pem"),
  cert: readFileSync("./cacert.pem")
});

const io = new Server(httpsServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("connected!!!")
});

httpsServer.listen(3000);