const { Router } = require("express");
const { nbmodel } = require("../models/notebook");
const router = Router();

router.get("/:id", function (req, res) {
  // @TODO edit last accessed in the notebook
  nbmodel.find;
  res.json({
    body: 200,
  });
});
