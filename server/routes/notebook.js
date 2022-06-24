const express = require("express");
const io = require("socket.io");
const Filehandler = require("../utils/FileHandler");

const fileworker = Filehandler.fileWorker;
const router = express.Router();
// const io = sio(5000);

router.get("/:id", (req, res) => {
  id = req.params.id;
  fileworker.createFile(`./files/file_${id}.json`);
  res.json({
    notebook: `created notebook ${id}`,
  });
});

router.get("/content/:id", (req, res) => {
  id = req.params.id;
  fileworker.readFile(`./files/file_${id}.json`, (data) => {
    res.json({
      data: data,
    });
  });
});

module.exports = router;
