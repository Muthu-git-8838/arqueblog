// importing modules
const express = require("express");
const router = express.Router();
const {
  createPost,
  getBlog,
  getQA,
  updatePost,
  deletePost,
  getPostDetail,
  getQADetail,
  getSimilarPosts,
  getRecommendedPosts,
  getRecentPostsById,
  getMyPosts,
  getWishListPosts,
  getSearchPosts,
  getMyFollowingsPosts,
} = require("../controllers/post");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const validateJwtToken = require("../middlewares/auth");
const optionalAuth = require("../middlewares/optionalAuth");
const validateAdmin = require("../middlewares/validateAdmin");

module.exports = (app) => {
  router.get("/",validateAdmin,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      post_type: Joi.string().default("blog"),
    }),
  }),
   getBlog
   );
   
   router.get("/get",validateAdmin,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      post_type: Joi.string().default("qa"),
    }),
  }),
   getQA
   );
  router.get("/get/recent", validateJwtToken, getRecentPostsById);
  router.get("/get/wishlist", validateJwtToken, getWishListPosts);
  router.post(
    "/get/search",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        text: Joi.string().default("").allow(""),
        category: Joi.string().default("all"),
      }),
    }),
    getSearchPosts
  );

  router.get(
    "/get/my-posts/",
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        userId: Joi.string().required(),
        status: Joi.string().valid("active", "expired").required(),
      }),
    }),
    getMyPosts
  );

  router.get(
    "/get/posts/userId",
    validateJwtToken,
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.string().required(),
      }),
    }),
    getMyPosts
  );

  router.get(
    "/get/recommended/",
    // validateJwtToken,
    // celebrate({
    //   [Segments.QUERY]: Joi.object().keys({
    //     vote_average: Joi.number().default(5),
    //     // views_count: Joi.number().required(),
    //     // vote_count: Joi.number().default(5),
    //   }),
    // }),
    getRecommendedPosts
  );

  router.get(
    "/get/followings/",
    validateJwtToken,
    // celebrate({
    //   [Segments.QUERY]: Joi.object().keys({
    //     vote_average: Joi.number().default(5),
    //     // views_count: Joi.number().required(),
    //     // vote_count: Joi.number().default(5),
    //   }),
    // }),
    getMyFollowingsPosts
  );

  router.get(
    "/get/similar/",
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        vote_average: Joi.number().required(),
        views_count: Joi.number().required(),
        vote_count: Joi.number().required(),
        followers_count: Joi.number().required(),
        category: Joi.string().required(),
        post_id: Joi.string().required(),
      }),
    }),
    getSimilarPosts
  );

  router.get(
    "/get/byid/:post_id",
    optionalAuth,
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        post_id: Joi.string().required(),
      }),
    }),
    getPostDetail
  );

  router.get(
    "/get/:post_id",
    optionalAuth,
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        post_id: Joi.string().required(),
      }),
    }),
    getQADetail
  );

  router.post(
    "/create",
    validateJwtToken,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().when('post_type', { is: 'blog', then: Joi.required(), otherwise: Joi.forbidden() }),
        descriptionHTML: Joi.string().when('post_type', { is: 'blog', then: Joi.required(), otherwise: Joi.forbidden() }),
        views_count: Joi.number().default(0),
        attachments: Joi.array().default([]),
        category: Joi.string().required(),
        post_type: Joi.string().valid('blog','qa'),
        parent_id: Joi.string().optional().default(null),
      }),
    }),
    createPost
  );
  router.put("/",celebrate({
    [Segments.BODY]: Joi.object().keys({
        _id: Joi.string().required(),
        title: Joi.string().required(),
        descriptionHTML: Joi.string().required(),
        is_active: Joi.boolean().optional(),
        post_type: Joi.string().required(),
        description: Joi.string().required(),
        views_count: Joi.number().default(0),
    })
}),updatePost);
router.put("/get",celebrate({
  [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().required(),
      title: Joi.string().required(),
      descriptionHTML: Joi.string().required(),
      is_active: Joi.boolean().optional(),
      post_type: Joi.string().required(),
      description: Joi.string().required(),
      views_count: Joi.number().default(0),
  })
}),updatePost);
  router.delete("/", celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().required(),
    })
}), deletePost);
router.delete("/get", celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required(),
  })
}), deletePost);
  app.use("/api/v1/post", router);
};
