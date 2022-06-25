const { Schema, model } = require("mongoose");

const Notebook = new Schema({
  _id: String,
  data: Object,
});
const nbmodel = model("Notebook", Notebook);

exports.Notebook = nbmodel;
exports.findOrCreate = async function (id) {
  if (id == null) return;

  const nbook = await nbmodel.findById(id);

  if (nbook) return nbook;

  return await nbmodel.create({ _id: id, data: "" });
};

exports.findAndUpdate = async function (id, data) {
  await nbmodel.findByIdAndUpdate(id, { data: data });
};
