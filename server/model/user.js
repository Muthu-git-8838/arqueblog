const mongoose = require("mongoose");

// schema with validation
const Schema = mongoose.Schema;
const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email must be provided"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    followers_count: {
      type: Number,
      default: 0,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    categories: [{ type: String, ref: "Category" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    user_attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
    accessToken: {
      type: String,
      default: null,
    },
    accessTokenCreatedAt: {
      type: Date,
      default: null,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    verifyTokenCreatedAt: {
      type: Date,
      default: null,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenCreatedAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    recently_visited: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Post" }],

    // rewards: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Rewards"
    // }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);
