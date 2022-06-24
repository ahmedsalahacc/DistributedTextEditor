// const express = require("express");
const FileHandler = require("../utils/FileHandler");
const io = require("socket.io");

const fileworker = FileHandler.fileWorker;

exports.sio = (server) => {
  return io(server, {
    transport: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    // socket handlers
    socket.on("message", (message) => {
      console.log(`message from ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });

    // notebook state handler
    socket.on("nbookstate", (state) => {
      console.log(state);
      try {
        fileworker.writeFile("./files/file_1.json", state);
      } catch (err) {
        console.error(err);
      }
    });

    // send from the notebook
    setInterval(() => {
      fileworker.readFile("./files/file_1.json", (data) => {
        socket.emit("nbookstate-response", data);
      });
    }, 2000);
  });

  io.emit("received");
};
