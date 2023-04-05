// importing modules
const express = require("express");
const router = express.Router();
const {
  getProfile,
  getAllProfile,
  deleteProfile,
  follow,
  unfollow,
  removeWishList,
  addWishList,
  getPublicProfile,
  getMyFollowings,
  getReports,
  updateUser,
} = require("../controllers/user");
const { signup } = require("../controllers/auth");

const { celebrate, Joi, errors, Segments } = require("celebrate");
const validateJwtToken = require("../middlewares/auth");
const validateAdmin = require("../middlewares/validateAdmin");

module.exports = (app) => {
  router.get("/",validateAdmin, getAllProfile);
  router.delete(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        _id: Joi.string().required(),
      }),
    }),
    deleteProfile
  );
  router.get(
    "/profile/:userId",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.string().required(),
      }),
    }),
    getPublicProfile
  );

  router.get("/profile", validateJwtToken, getProfile);
  router.get("/reports", getReports);
  router.put(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        _id: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        isAdmin: Joi.boolean().required(),
        isActive: Joi.boolean().required(),
        isApproved: Joi.boolean().required(),

        categories: Joi.array().optional(),
        followers: Joi.string().optional(),
        followers_count: Joi.string().optional(),
        posts: Joi.string().optional(),
        user_attachments: Joi.string().optional(),
      }),
    }),
    updateUser
  );
  router.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean().required(),
        isActive: Joi.boolean().required(),
        isApproved: Joi.boolean().required(),
        categories: Joi.array().optional(),
        followers: Joi.string().optional(),
        followers_count: Joi.string().optional(),
        posts: Joi.string().optional(),
        user_attachments: Joi.string().optional(),
      }),
    }),
    signup
  );

  router.get(
    "/followings",
    validateJwtToken,
    // celebrate({
    //   [Segments.QUERY]: Joi.object().keys({
    //     vote_average: Joi.number().default(5),
    //     // views_count: Joi.number().required(),
    //     // vote_count: Joi.number().default(5),
    //   }),
    // }),
    getMyFollowings
  );

  router.post(
    "/follow",
    validateJwtToken,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        userId: Joi.string().required(),
      }),
    }),
    follow
  );
  router.post(
    "/unfollow",
    validateJwtToken,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        userId: Joi.string().required(),
      }),
    }),
    unfollow
  );
  router.post(
    "/add-wishlist",
    validateJwtToken,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        postId: Joi.string().required(),
      }),
    }),
    addWishList
  );
  router.post(
    "/remove-wishlist",
    validateJwtToken,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        postId: Joi.string().required(),
      }),
    }),
    removeWishList
  );

  app.use("/api/v1/user", router);
};
