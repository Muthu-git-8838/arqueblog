const mongoose = require("mongoose");

// schema with validation
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema(
  {
    starCount: {
      type: Number,
      default: 1,
    },
    review: {
      type: String,
      default: 1,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
   
    reviewed_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewsSchema);
