const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  asin: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = Item = mongoose.model("items", ItemSchema);
