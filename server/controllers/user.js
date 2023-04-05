const mongoose = require("mongoose");
const Post = require("../model/post");
const Category = require("../model/category");

const User = require("../model/user");
const bcrypt = require("bcrypt");
const { getColumns } = require("../helpers/handlers");
const _ = require("lodash");
const moment= require('moment')
const saltRounds = 10;

const getAllProfile = async (req, res) => {
  try {
    const user = await User.find({});

    return res.sendResponse({
      data: {
        rows: user,
        columns: getColumns(User),
      },
    });
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};
const deleteProfile = async (req, res) => {
  try {
    const _id = req.body._id;
    await User.deleteOne({ _id: _id });
    return res.sendResponse();
  } catch (error) {
    return res.sendError({ message: error.message });
  }
};
const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate({
        path: "categories",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "user_attachments",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "followers",
        select: {
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      });
    if (!user) {
      return res.sendError({
        success: false,
        message: "User not found!",
        statuscode: 404,
      });
    }
    return res.sendResponse({
      success: true,
      data: {
        email: user.email,
        first_name: user.first_name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        last_name: user.last_name,
        user_attachments: user.user_attachments,
        categories: user.categories,
        followers: user.followers || [],
        wishlist: user.wishlist || [],
        _id: user._id,
      },
    });
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
      .populate({
        path: "categories",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "user_attachments",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "followers",
        select: {
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      });
    if (!user) {
      return res.sendError({
        success: false,
        message: "User not found!",
        statuscode: 404,
      });
    }
    return res.sendResponse({
      success: true,
      data: {
        email: user.email,
        first_name: user.first_name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        last_name: user.last_name,
        user_attachments: user.user_attachments,
        categories: user.categories,
        followers: user.followers || [],
        wishlist: user.wishlist || [],
        _id: user._id,
      },
    });
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};

const follow = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    console.log(
      "s-s-s>>>>>>>>>>>>>>ususueeu>>>>.",
      req.user._id,
      req.body.userId
    );
    if (user.followers && user.followers.includes(req.user._id)) {
      return res.sendError({
        message: "You have already following this user!",
      });
    }
    await user.updateOne({
      $addToSet: { followers: req.user._id },
      $inc: { followers_count: 1 },
    });
    return res.sendResponse({
      // data: alreadyFollowed,
    });
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (user.followers && !user.followers.includes(req.user._id)) {
      return res.sendError({
        message: "You haven't following this user!",
      });
    }

    await user.updateOne({
      $pull: { followers: req.user._id },
      $inc: { followers_count: -1 },
    });
    return res.sendResponse({});
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};

const addWishList = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.user._id },
      { $addToSet: { wishlist: req.body.postId } }
    );
    return res.sendResponse({
      // data: alreadyFollowed,
    });
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};

const removeWishList = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.user._id },
      { $pull: { wishlist: req.body.postId } }
    );
    return res.sendResponse({});
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};

const getMyFollowings = async (req, res) => {
  try {
    const users = await User.find({ followers: { $in: req.user._id } })
      .populate({
        path: "categories",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "user_attachments",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "followers",
        select: {
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      });
    if (!users || users.length === 0) {
      return res.sendError({
        success: false,
        message: "User not found!",
        statuscode: 404,
      });
    }
    return res.sendResponse({
      success: true,
      data: users.map((user) => {
        return {
          email: user.email,
          first_name: user.first_name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          last_name: user.last_name,
          user_attachments: user.user_attachments,
          categories: user.categories,
          followers: user.followers,
          wishlist: user.wishlist || [],
          _id: user._id,
        };
      }),
    });
  } catch (err) {
    return res.sendError({ success: false, message: err.message });
  }
};
const getReports = async (req, res) => {
  try {
    const users = await User.find({});
    const blogs = await Post.find({ post_type: "blog" });
    const questions = await Post.find({ post_type: "qa" });
    const categories = await Category.find({});
    const parseResult = (data) => {
      return _.groupBy(
        data,
        ({ createdAt }) =>
          moment(createdAt).format('MMM-YYYY')
      );
    };
    const usersGroup = parseResult(users);
    const blogsGroup = parseResult(blogs);
    const questionsGroup = parseResult(questions);
    const result = Object.keys(usersGroup).reduce((acc, cv) => {
      acc.push({
        name: cv,
        users: usersGroup[cv].length,
        blogs: blogsGroup[cv] ? blogsGroup[cv].length : 0,
        questions: questionsGroup[cv] ? questionsGroup[cv].length : 0,
      });
      return acc;
    }, []);
    const data = [
      {
        name: "Reports 1",
        users: 20,
        blogs: 15,
        questions: 11,
        categories: 13,
      },
      {
        name: "Reports 2",
        users: 18,
        blogs: 10,
        questions: 12,
        categories: 15,
      },
      {
        name: "Reports 3",
        users: 10,
        blogs: 15,
        questions: 17,
        categories: 11,
      },
    ];
    return res.sendResponse({
      data: {
        usersCount: users.length,
        blogsCount: blogs.length,
        questionsCount: questions.length,
        categoriesCount: categories.length,
        graphData: result
      },
    });
  } catch (err) {
    return res.sendError({ message: err });
  }
};

const updateUser = async (req, res) => {
  const { _id, first_name, last_name, email } = req.body;

  try {
    const msg = await User.findOne({ _id: _id });

    const result = await User.updateMany(
      { _id: _id },
      { first_name, last_name, email }
    );

    return res.sendResponse({ data: result });
  } catch (error) {
    return res.sendError({ message: error.message });
  }
};
const createUser = async (req, res) => {
  const { _id, first_name, last_name, email } = req.body;

  try {
    const result = await User.create({
      ...req.body,
      _id: mongoose.Types.ObjectId(),
    });

    return res.sendResponse({ data: result });
  } catch (error) {
    return res.sendError({ message: error.message });
  }
};
//
module.exports = {
  getMyFollowings,
  deleteProfile,
  getPublicProfile,
  getProfile,
  getAllProfile,
  follow,
  unfollow,
  removeWishList,
  addWishList,
  getReports,
  updateUser,
  createUser,
};
