const mongoose = require("mongoose");

// schema with validation
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      text: true
    },
    description: {
      type: String,
      trim: true,
      text: true
    },
    descriptionHTML:{
      type: String,
      trim: true,
      text: true
    },
    views_count: {
      type: Number,
      default: 0,
    },
    vote_average: {
      type: Number,
      default: 0,
    },
    vote_count: {
      type: Number,
      default: 0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    parent_id: {
      type: String,
      default: null,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
    posted_by: { type: Schema.Types.ObjectId, ref: "User" },
    viewed_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: { type: String, ref: "Category" },
    post_type: { type: String, ref: "Posttype" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
