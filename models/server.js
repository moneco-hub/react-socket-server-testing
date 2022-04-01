const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    //Http server
    this.server = http.createServer(this.app);

    //Sockets Config
    this.io = socketio(this.server, {
      /**Configuraciones */
    });
  }

  middlewares() {
    //Deploy public directory
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //CORS
    this.app.use(cors());
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Initialize Middlewares
    this.middlewares();

    //Initialize sockets
    this.configSockets();

    //Initialize Server
    this.server.listen(this.port, () => {
      console.log("Running Socket Sever On Port:" + this.port);
    });
  }
}

module.exports = Server;
