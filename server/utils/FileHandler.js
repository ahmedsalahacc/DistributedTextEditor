const fs = require("fs");

const fileWorker = {
  createFile: async function (fname) {
    fs.writeFile(fname, "", (err, data) => {
      console.error(err);
    });
  },

  writeFile: async function (fname, newValue) {
    this.mutex.acquire();
    fs.writeFile(fname, newValue, "utf-8", (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
    this.mutex.release();
  },
  readFile: async function (fname, callback) {
    fs.readFile(fname, "utf-8", function (err, data) {
      if (err) throw err;
      callback(data);
    });
  },

  mutex: {
    lock: false,
    isLocked: function () {
      return this.lock;
    },
    acquire: function () {
      while (this.isLocked()) {} // busy wait
      this.lock = true;
    },
    release: function () {
      if (this.isLocked()) this.lock = false;
    },
  },
};

module.exports = {
  fileWorker: fileWorker,
};
