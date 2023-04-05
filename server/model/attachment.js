const mongoose = require("mongoose");

// schema with validation
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema(
  {
    fieldname: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    destination: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attachment", AttachmentSchema);
