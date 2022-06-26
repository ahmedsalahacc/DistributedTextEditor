const io = require("socket.io");
const { findOrCreate, findAndUpdate } = require("../models/notebook");

const usersTracker = {
  checkIfExists: function (id) {
    return !(this[id] == null);
  },

  checkIfIdexistsAndAdd: function (id) {
    if (this.checkIfExists(id)) this[id]++;
    else this[id] = 1;
  },
  checkIfIdexistsAndDecrement: function (id) {
    if (this.checkIfExists(id) && this[id] > 0) this[id]--;
    if (this[id] == 0) delete this[id];
  },
};

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

    socket.on("doc/get", async (id) => {
      const doc = await findOrCreate(id);
      usersTracker.checkIfIdexistsAndAdd(id);
      socket.broadcast.to(id).emit("n-users", usersTracker[id]);

      socket.join(id);
      socket.emit("doc/load", doc.data);

      socket.on("delta/push", (delta) => {
        // broadcasts to all subscribers but the current
        socket.broadcast.to(id).emit("delta/pull", delta);
      });

      socket.on("autosave", async (data) => {
        await findAndUpdate(id, data);
        socket.broadcast.to(id).emit("n-users", usersTracker[id]);
      });

      socket.on("disconnect", () => {
        usersTracker.checkIfIdexistsAndDecrement(id);
        console.log("disconnected");
        socket.broadcast.to(id).emit("n-users", usersTracker[id]);
      });
    });
  });
};
