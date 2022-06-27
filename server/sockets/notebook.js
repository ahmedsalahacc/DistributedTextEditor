const io = require("socket.io");
const crypto = require("crypto-js");
const { findOrCreate, findAndUpdate } = require("../models/notebook");
const { DifferentialSynchronizationServer } = require("../utils/diffsync");

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

const dss = new DifferentialSynchronizationServer();

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
      const clientID = socket.id;
      console.log("doc/get");
      const eid = crypto.MD5(id).toString();
      const doc = await findOrCreate(eid);
      console.log(doc.data);
      dss.addShadow(doc.data, id, clientID);
      usersTracker.checkIfIdexistsAndAdd(id);

      socket.broadcast.to(id).emit("n-users", usersTracker[id]);

      socket.join(id);
      socket.emit("doc/load", doc.data);

      socket.on("delta/push", async (delta) => {
        console.log("delta/push");
        console.log(dss.clientShadows);
        // broadcasts to all subscribers but the current
        dss.applyPatchesToShadow(delta, id, clientID);
        let serverText = await findOrCreate(eid);
        serverText = serverText.data;
        console.log("serverText", serverText);
        const newServerText = dss.applyPatchesToText(delta, serverText);
        console.log("---");
        console.log(
          "server text",
          newServerText,
          "shadow text",
          dss.clientShadows[id][clientID]
        );
        console.log("---");
        await findAndUpdate(eid, newServerText);

        ///------------------

        // dss.clientShadows.foreach((client,idx)=>{
        // })
        console.log("keys-=", Object.keys(dss.clientShadows[id]));
        for (let key of Object.keys(dss.clientShadows[id])) {
          if (key === clientID) continue;
          // get the difference between clientshadow i and the crt server text
          const patches = dss.getPatchesToMatchText(newServerText, id, key);
          console.log("patches between s and c", patches);
          // emit each difference to the corresponding client
          io.to(key).emit("delta/pull", patches);
          // update client shadow after diff
          dss.updateShadow(newServerText, id, key);
        }
        ///------------------

        // const newPatches = dss.getPatchesToMatchText(
        //   newServerText,
        //   id,
        //   clientID
        // );
        // dss.updateShadow(newServerText, id, clientID);
        // console.log("deltas to update:", newPatches);
        // socket.broadcast.to(id).emit("delta/pull", newPatches);
      });

      socket.on("autosave", async (data) => {
        // console.log("autosave");
        // apply all ds steps here
        // const serverText = await findOrCreate(eid).data;
        // const delta_shadow = dss.getPatchesToMatchText(data, id);
        // const delta_server = dss.getPatchesFrom1To2(data, id);

        // dss.applyPatchesToShadow(delta_shadow, id);
        // const newServerText = dss.applyPatchesToText(delta_server, serverText);
        // // console.log(newServerText);
        // // await findAndUpdate(eid, newServerText);
        // const newPatches = dss.getPatchesToMatchText(newServerText, id);
        // dss.updateShadow(newServerText, id);

        // socket.broadcast.to(id).emit("delta/pull", newPatches);
        socket.broadcast.to(id).emit("n-users", usersTracker[id]);
      });

      socket.on("disconnect", () => {
        usersTracker.checkIfIdexistsAndDecrement(id);
        console.log("disconnected");
        dss.deleteShadow(id);
        socket.broadcast.to(id).emit("n-users", usersTracker[id]);
      });
    });
  });
};
