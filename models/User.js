const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
  },
  target: {
    type: Number,
    required: true,
  },
  itemRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "items",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailNotification: {
    type: Boolean,
    required: true,
    default: false,
  },
  items: [ItemSchema],
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = User = mongoose.model("users", UserSchema);
