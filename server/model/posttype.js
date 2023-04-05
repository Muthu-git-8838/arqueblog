const mongoose = require("mongoose");

// schema with validation
const Schema = mongoose.Schema;

const PostTypeSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, _id: false }
);

module.exports = mongoose.model("Posttype", PostTypeSchema);
