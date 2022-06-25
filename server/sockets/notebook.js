const io = require("socket.io");

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

    socket.on("send-changes", (delta) => {
      console.log(delta);
    });
  });
};
