const http = require("http");
const express = require("express");
const cors = require("cors");
const socketsConfig = require("./routes/socketsConfig");

const app = express();

const server = http.createServer(app);

const io = socketsConfig.sio(server);

// cors
app.use(cors());

// socket
socketsConfig.connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "hi",
  });
});

//routes
const notebookRouter = require("./routes/notebook");

app.use(
  "/notebook",
  socketIOMiddleware,
  (req, res, next) => {
    req.io.emit("nbookstateResponse", `Hello ${req.originalUrl}`);
    // res.send("hello world!!");
    next();
  },
  notebookRouter
);

// listen

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("APP is running");
});
