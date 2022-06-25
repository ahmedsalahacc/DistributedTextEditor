const { Schema, model } = require("mongoose");

const Notebook = new Schema({
  _id: String,
  data: Object,
});

exports.Notebook = model("Notebook", Notebook);
exports.findOrCreate = async function (id) {
  if (id == null) return;

  const nbook = await Notebook.findById(id);

  if (document) return document;

  return await Document.create({ _id: id, data: "" });
};
