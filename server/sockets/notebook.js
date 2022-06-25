const io = require("socket.io");
const { findOrCreate } = require("../models/notebook");

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
    console.log("client connected");

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("doc/get", (id) => {
      const doc = findOrCreate(id);
      socket.join(id);
      socket.emit("doc/load", doc.data);

      socket.on("delta/push", (delta) => {
        console.log(delta);
        // broadcasts to all subscribers but the current
        socket.broadcast.to(id).emit("delta/pull", delta);
      });

      socket.on("autosave", (delta) => {});
    });
  });
};
