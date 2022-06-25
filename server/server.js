require("dotenv").config();

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

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
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
