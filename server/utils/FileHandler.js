const fs = require("fs");

const fileWorker = {
  createFile: async function (fname) {
    fs.writeFile(fname, "", (err, data) => {
      console.error(err);
    });
  },

  writeFile: async function (fname, newValue) {
    fs.writeFile(fname, newValue, "utf-8", (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
  },
  readFile: async function (fname, callback) {
    fs.readFile(fname, "utf-8", function (err, data) {
      if (err) throw err;
      callback(data);
    });
  },
};

module.exports = {
  fileWorker: fileWorker,
};
