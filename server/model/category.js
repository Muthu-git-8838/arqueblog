const mongoose = require("mongoose");

// schema with validation
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      default: null,
    },
    image: {
      type: Array,
      default: null,
    },
    // image: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],

    is_active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, _id:false }
);

module.exports = mongoose.model("Category", CategorySchema);
