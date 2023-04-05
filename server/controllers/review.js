const { jwtSign } = require("../helpers/JWT");
const Review = require("../model/review");
const Post = require("../model/post");


const createReview = async (req, res) => {
  try {
    const isReviewExists = await Review.findOne({
      reviewed_by: req.user._id,
      post: req.body.post,
    });
    if (isReviewExists) return res.sendResponse({ data: isReviewExists });
    const review = await Review.create({
      ...req.body,
      starCount: req.body.starCount < 0 ? 1 : req.body.starCount,
      reviewed_by: req.user._id,
    });
    const allReviews = await Review.find({
      post: req.body.post,
    });
    const vote_count = allReviews.length;
    const vote_average = vote_count
      ? allReviews.reduce((acc, cv) => acc + cv.starCount, 0) / vote_count
      : 0;
    await Post.updateOne(
      { _id: req.body.post },
      {
        $addToSet: { reviews: review._id },
        vote_average,
        vote_count,
      }
    );
    return res.sendResponse({ data: review });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ post: req.params.postId })
      .populate({
        path: "reviewed_by",
        select: {
          first_name: 1,
          last_name: 1,
          email: 1,
          _id: 1,
          updatedAt: 1,
        },
      })
      .populate({
        path: "post",
        // select: { _id: 1, updatedAt: 1 },
      })
      .sort({ updatedAt: -1 });
    return res.sendResponse({
      data: reviews,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};
// const createAnswer = async (req, res) => {
//   try {
//     const isReviewExists = await Review.findOne({
//       reviewed_by: req.user._id,
//       question: req.body.question,
//     });
//     if (isReviewExists) return res.sendResponse({ data: isReviewExists });
//     const review = await Review.create({
//       ...req.body,
//       starCount: req.body.starCount < 0 ? 1 : req.body.starCount,
//       reviewed_by: req.user._id,
//     });
//     const allReviews = await Review.find({
//       question: req.body.question,
//     });
//     const vote_count = allReviews.length;
//     const vote_average = vote_count
//       ? allReviews.reduce((acc, cv) => acc + cv.starCount, 0) / vote_count
//       : 0;
//     await Question.updateOne(
//       { _id: req.body.question },
//       {
//         $addToSet: { reviews: review._id },
//         vote_average,
//         vote_count,
//       }
//     );
//     return res.sendResponse({ data: review });
//   } catch (err) {
//     return res.sendError({ message: err.message });
//   }
// };

// const getAnswers = async (req, res) => {
//   try {
//     const reviews = await Review.find({ question: req.params.questionId })
//       .populate({
//         path: "reviewed_by",
//         select: {
//           first_name: 1,
//           last_name: 1,
//           email: 1,
//           _id: 1,
//           updatedAt: 1,
//         },
//       })
//       .populate({
//         path: "question",
//         // select: { _id: 1, updatedAt: 1 },
//       })
//       .sort({ updatedAt: -1 });
//     return res.sendResponse({
//       data: reviews,
//     });
//   } catch (err) {
//     return res.sendError({ message: err.message });
//   }
// };
module.exports = { createReview, getReviews };
