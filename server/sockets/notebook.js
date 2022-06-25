const io = require("socket.io");
const { findOrCreate, findAndUpdate } = require("../models/notebook");

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

    socket.on("doc/get", async (id) => {
      const doc = await findOrCreate(id);
      socket.join(id);
      socket.emit("doc/load", doc.data);

      socket.on("delta/push", (delta) => {
        // broadcasts to all subscribers but the current
        socket.broadcast.to(id).emit("delta/pull", delta);
      });

      socket.on("autosave", async (data) => {
        await findAndUpdate(id, data);
      });
    });
  });
};
