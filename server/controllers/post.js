const mongoose = require("mongoose");
const { jwtSign } = require("../helpers/JWT");
const Post = require("../model/post");
const User = require("../model/user");
const { getColumns } = require("../helpers/handlers");

let postProjectFields = {
  title: 1,
  description: 1,
  descriptionHTML:1,
  views_count: 1,
  vote_average: 1,
  vote_count: 1,
  reviews: 1,
  attachments: 1,
  posted_by: 1,
  viewed_by: 1,
  category: 1,
  post_type: 1,
  createdAt: 1,
  updatedAt: 1,
};

const findDistance = (msg) => {
  const {
    views_count = 0,
    vote_count = 0,
    vote_average = 0,
    followers_count = 0,
  } = msg;

  const maxCount = Math.max(
    views_count || 0,
    followers_count || 0,
    vote_count || 0,
    vote_average
  );

  const query = Object.keys(msg).reduce((acc, cv) => {
    if (msg[cv]) {
      acc.push({
        $pow: [
          {
            $subtract: [
              maxCount,
              {
                $divide: [
                  {
                    $multiply: [
                      cv == "followers_count"
                        ? "$posted.followers_count"
                        : `$${cv}`,
                      maxCount,
                    ],
                  },
                  Number(msg[cv]),
                ],
              },
            ],
          },
          2,
        ],
      });
    }

    return acc;
  }, []);

  console.log("S-s-s>>>>>query>>>>>>>", JSON.stringify(query));
  return {
    $sqrt: {
      $add: query,
    },
  };
};

// let queries = [
//   {
//     as: "posted_by",
//     from: "users",
//     fromField: "posted_by",
//     to: "user",
//     toField: "_id",
//     select: {
//       posts: 1,
//       business: 1,
//       email: 1,
//       first_name: 1,
//       last_name: 1,
//       _id: 1,
//       updatedAt: 1,
//     },
//   },
//   {
//     as: "currency",
//     from: "currencies",
//     fromField: "currency",
//     to: "currency",
//     toField: "_id",
//   },
//   {
//     as: "category",
//     from: "categories",
//     fromField: "category",
//     to: "category",
//     toField: "_id",
//   },
//   {
//     as: "reviews",
//     from: "reviews",
//     fromField: "reviews",
//     to: "review",
//     toField: "_id",
//   },
// ];

// const lookUps = (queries = []) => {
//   const result = queries.reduce((acc, query) => {
//     let _toField = `${query.to}__${query.toField}`;
//     let pipeline = [
//       {
//         $match: {
//           $expr: { $eq: [`$${query.fromField}`, `$$${_toField}`] },
//         },
//       },
//     ];
//     if (query.select) {
//       pipeline.push({ $project: query.select });
//     }
//     const newQuery = [
//       {
//         $lookup: {
//           from: query.from,
//           let: { [_toField]: `$${query.to}.${query.toField}` },
//           pipeline: pipeline,
//           // as: "campaign.client"
//           // from: "currencies",
//           // localField: "currency",
//           // foreignField: "_id",
//           as: query.as,
//         },
//       },
//       { $unwind: `$${query.as}` },
//     ];
//     acc = [...acc, ...newQuery];
//     return acc;
//   }, []);
//   console.log("S-s-s>>>>>>>>>>>>>", JSON.stringify(result));
//   return result;
// };

const createPost = async (req, res) => {
  const io = req.app.get("io");
  try {
    const post = await Post.create({ ...req.body, posted_by: req.user._id });
    await User.updateOne(
      { _id: req.user._id },
      { $addToSet: { posts: post._id } }
    );
    return res.sendResponse({
      data: post,
      message: "Your post has been created successfully!",
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const populatPost = async (posts) => {
  await Post.populate(posts, [
    {
      path: "posted_by",
      populate: {
        path: "user_attachments",
      },
      select: {
        posts: 1,
        email: 1,
        first_name: 1,
        last_name: 1,
        _id: 1,
        updatedAt: 1,
        createdAt: 1,
        followers: 1,
        followers_count: 1,
      },
    },
    {
      path: "category",
      // select: { _id: 1, updatedAt: 1 },
    },
    {
      path: "reviews",
      populate: {
        path: "reviewed_by",
        select: {
          first_name: 1,
          last_name: 1,
          email: 1,
          _id: 1,
          updatedAt: 1,
        },
      },
      select: {
        review: 1,
        starCount: 1,
        reviewed_by: 1,
        _id: 1,
        updatedAt: 1,
      },
    },
    {
      path: "post_type",
      // select: { _id: 1, updatedAt: 1 },
    },
    {
      path: "attachments",
    },
  ]);
};

const getBlog = async (req, res) => {
  try {
  
    const posts = await Post.find({post_type: "blog" })

      // .populate({
      //   path: "posted_by",
      //   populate: {
      //     path: "user_attachments",
      //   },
      //   select: {
      //     posts: 1,
      //     email: 1,
      //     first_name: 1,
      //     last_name: 1,
      //     _id: 1,
      //     updatedAt: 1,
      //     createdAt: 1,
      //     followers: 1,
      //     followers_count: 1,
      //   },
      // })
      // .populate({
      //   path: "category",
      //   // select: { _id: 1, updatedAt: 1 },
      // })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      // .populate({
      //   path: "post_type",
      //   // select: { _id: 1, updatedAt: 1 },
      // })
      .populate({
        path: "attachments",
      })
      .sort({ updatedAt: -1 });
    return res.sendResponse({
      data: {
        rows: posts,
        columns: getColumns(Post)}
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getQA = async (req, res) => {
  try {
   const posts = await Post.find({ post_type: "qa"  })

      // .populate({
      //   path: "posted_by",
      //   populate: {
      //     path: "user_attachments",
      //   },
      //   select: {
      //     posts: 1,
      //     email: 1,
      //     first_name: 1,
      //     last_name: 1,
      //     _id: 1,
      //     updatedAt: 1,
      //     createdAt: 1,
      //     followers: 1,
      //     followers_count: 1,
      //   },
      // })
      // .populate({
      //   path: "category",
      //   // select: { _id: 1, updatedAt: 1 },
      // })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      // .populate({
      //   path: "post_type",
      //   // select: { _id: 1, updatedAt: 1 },
      // })
      .populate({
        path: "attachments",
      })
      .sort({ updatedAt: -1 });
    return res.sendResponse({
      data: {
        rows: posts,
        columns: getColumns(Post)}
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};
const deletePost = async (req, res) => {

  try {
      const _id = req.body._id;
      await Post.deleteOne({ _id: _id })
      return res.sendResponse();
  }
  catch (error) {
      return res.sendError({ message: error.message });
  }
}
const getMyPosts = async (req, res) => {
  let query = {
    is_active: req.query.status === "active",
    posted_by: req.query.userId
  };
  try {
    const posts = await Post.find(query)
      .populate({
        path: "posted_by",
        populate: {
          path: "user_attachments",
        },
        select: {
          posts: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      })
      .populate({
        path: "category",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      .populate({
        path: "post_type",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "attachments",
      })
      .sort({ updatedAt: -1 });
    return res.sendResponse({
      data: posts,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getPostDetail = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id })
      .populate({
        path: "posted_by",
        populate: {
          path: "user_attachments",
        },
        select: {
          posts: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      })
      .populate({
        path: "category",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "post_type",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "attachments",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      .sort({ updatedAt: -1 });
    if (req.user) {
      await User.updateOne(
        { _id: req.user._id },
        {
          $push: { recently_visited: req.params.post_id },
        }
      );
      if (!post.viewed_by.includes(req.user._id)) {
        await post.update({
          $addToSet: { viewed_by: req.user._id },
          $inc: { views_count: 1 },
        });
      }
    }

    const answers = await Post.find({ parent_id: req.params.post_id })
    .populate({
      path: "posted_by",
      populate: {
        path: "user_attachments",
      },
      select: {
        posts: 1,
        email: 1,
        first_name: 1,
        last_name: 1,
        _id: 1,
        updatedAt: 1,
        createdAt: 1,
        followers: 1,
        followers_count: 1,
      },
    })
    .populate({
      path: "category",
      // select: { _id: 1, updatedAt: 1 },
    })
    .populate({
      path: "post_type",
      // select: { _id: 1, updatedAt: 1 },
    })
    .populate({
      path: "attachments",
      // select: { _id: 1, updatedAt: 1 },
    })
    .populate({
      path: "reviews",
      populate: {
        path: "reviewed_by",
        populate: {
          path: "user_attachments",
        },
        select: {
          first_name: 1,
          last_name: 1,
          email: 1,
          _id: 1,
          updatedAt: 1,
        },
      },
      select: {
        review: 1,
        starCount: 1,
        reviewed_by: 1,
        _id: 1,
        updatedAt: 1,
      },
    })
    .sort({ updatedAt: -1 });
    return res.sendResponse({
      data: {post,answers},
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};
const getQADetail = async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.post_id,
      parent_id: req.body.parent_id   })
      .populate({
        path: "posted_by",
        populate: {
          path: "user_attachments",
        },
        select: {
          posts: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      })
      .populate({
        path: "category",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "post_type",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "attachments",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      .sort({ updatedAt: -1 });
    if (req.user) {
      await User.updateOne(
        { _id: req.user._id },
        {
          $push: { recently_visited: req.params.post_id },
        }
      );
      if (!post.viewed_by.includes(req.user._id)) {
        await post.update({
          $addToSet: { viewed_by: req.user._id },
          $inc: { views_count: 1 },
        });
      }
    }
    return res.sendResponse({
      data: post,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};
const getRecommendedPosts = async (req, res) => {
  try {
    const maxViewedPost = await Post.findOne({}).sort({ views_count: -1 });
    const maxFollowedUser = await User.findOne({}).sort({
      followers_count: -1,
    });
    const maxVotedPost = await Post.findOne({}).sort({ vote_count: -1 });
    const maxStarCount = 5;

    const recommentedPosts = await Post.aggregate([
      {
        $match: {
          vote_average: { $type: "number" },
          vote_count: { $type: "number" },
          views_count: { $type: "number" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "posted_by",
          foreignField: "_id",
          as: "posted",
        },
      },
      { $unwind: "$posted" },
      {
        $project: {
          ...postProjectFields,
          distance: findDistance({
            views_count: maxViewedPost ? maxViewedPost.views_count : 0,
            vote_count: maxVotedPost ? maxVotedPost.vote_count : 0,
            vote_average: maxStarCount,
            followers_count: maxFollowedUser
              ? maxFollowedUser.followers_count
              : 0,
          }),
        },
      },
      {
        $match: {
          distance: { $ne: null },
        },
      },
      {
        $sort: { distance: 1 },
      },
      // {
      //   $limit: 5,
      // },
    ]);

    await populatPost(recommentedPosts);
    return res.sendResponse({
      data: recommentedPosts,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getSimilarPosts = async (req, res) => {
  console.log("s-s-s>>>>>req.query.post_id>>>>>>>>>", req.query.post_id);

  try {
    const similarPosts = await Post.aggregate([
      {
        $match: {
          vote_average: { $type: "number" },
          vote_count: { $type: "number" },
          views_count: { $type: "number" },
          category: req.query.category,
          _id: { $ne: mongoose.Types.ObjectId(req.query.post_id) },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "posted_by",
          foreignField: "_id",
          as: "posted",
        },
      },
      { $unwind: "$posted" },
      {
        $project: {
          ...postProjectFields,
          distance: findDistance({
            views_count: req.query.views_count,
            vote_count: req.query.vote_count,
            vote_average: req.query.vote_average,
            followers_count: req.query.followers_count,
          }),
        },
      },
      {
        $match: {
          distance: { $ne: null },
        },
      },
      {
        $sort: { distance: 1 },
      },
      // {
      //   $limit: 5,
      // },
    ]);
    await populatPost(similarPosts);
    return res.sendResponse({
      data: similarPosts,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getRecentPostsById = async (req, res) => {
  try {
    let recently_visited = Object.values(
      (req.user.recently_visited
        ? req.user.recently_visited.reverse()
        : []
      ).reduce((acc, cv) => {
        acc[cv] = cv;
        return acc;
      }, {})
    );
    const posts = await Post.find({
      _id: { $in: recently_visited },
    })
      .populate({
        path: "posted_by",
        populate: {
          path: "user_attachments",
        },
        select: {
          posts: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      })
      .populate({
        path: "category",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      .populate({
        path: "post_type",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "attachments",
      });
    Post;
    // .sort({ updatedAt: -1 });
    const updatedPosts = posts.reduce((acc, post) => {
      acc[post._id] = post;
      return acc;
    }, {});

    return res.sendResponse({
      data: recently_visited.reduce((acc, cv) => {
        acc.push(updatedPosts[`${cv}`]);
        return acc;
      }, []),
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getWishListPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      _id: { $in: req.user.wishlist },
    })
      .populate({
        path: "posted_by",
        populate: {
          path: "user_attachments",
        },
        select: {
          posts: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      })
      .populate({
        path: "category",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      .populate({
        path: "post_type",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "attachments",
      })
      .sort({ updatedAt: -1 });
    return res.sendResponse({
      data: posts,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getSearchPosts = async (req, res) => {
  try {
    let query = {
      ...(req.body.category !== "all" ? { category: req.body.category } : {}),
    };
    if (req.body.text) {
      query["$text"] = { $search: req.body.text };
    }

    const posts = await Post.find(query)
      .populate({
        path: "posted_by",
        populate: {
          path: "user_attachments",
        },
        select: {
          posts: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          followers: 1,
          followers_count: 1,
        },
      })
      .populate({
        path: "category",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewed_by",
          populate: {
            path: "user_attachments",
          },
          select: {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            updatedAt: 1,
          },
        },
        select: {
          review: 1,
          starCount: 1,
          reviewed_by: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      .populate({
        path: "post_type",
        // select: { _id: 1, updatedAt: 1 },
      })
      .populate({
        path: "attachments",
      })
      .sort({ updatedAt: -1 });
    return res.sendResponse({
      data: posts,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getMyFollowingsPosts = async (req, res) => {
  try {
    const maxViewedPost = await Post.findOne({}).sort({ views_count: -1 });
    const maxFollowedUser = await User.findOne({}).sort({
      followers_count: -1,
    });
    const maxVotedPost = await Post.findOne({}).sort({ vote_count: -1 });
    const maxStarCount = 5;

    const recommentedPosts = await Post.aggregate([
      {
        $match: {
          vote_average: { $type: "number" },
          vote_count: { $type: "number" },
          views_count: { $type: "number" },
          category: { $in: req.user.categories },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "posted_by",
          foreignField: "_id",
          as: "posted",
        },
      },
      { $unwind: "$posted" },
      {
        $project: {
          ...postProjectFields,
          distance: findDistance({
            views_count: maxViewedPost ? maxViewedPost.views_count : 0,
            vote_count: maxVotedPost ? maxVotedPost.vote_count : 0,
            vote_average: maxStarCount,
            followers_count: maxFollowedUser
              ? maxFollowedUser.followers_count
              : 0,
          }),
        },
      },
      {
        $match: {
          distance: { $ne: null },
        },
      },
      {
        $sort: { distance: 1 },
      },
      // {
      //   $limit: 5,
      // },
    ]);

    await populatPost(recommentedPosts);
    return res.sendResponse({
      data: recommentedPosts,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};
const updatePost = async (req, res) => {

  const {_id, ...update } = req.body;


  try {
      const msg = await Post.findOne({ _id: _id });
    
      const result = await Post.updateMany({ _id: _id },{ ...update  } );

      return res.sendResponse({ data: result });
  }

  catch (error) {
      return res.sendError({ message: error.message });
  }
}
module.exports = {
  createPost,
  updatePost,
  getBlog,
  getQA,
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
};
