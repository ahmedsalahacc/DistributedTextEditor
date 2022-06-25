const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const nbooksockets = require("./sockets/notebook");

const app = express();

// app middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/distributed-text-editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const server = http.createServer(app);

const io = nbooksockets.sio(server);

// socket
nbooksockets.connection(io);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "hi",
  });
});

// listen

const port = process.env.PORT || 3500;
server.listen(port, () => {
  console.log("APP is running");
});
