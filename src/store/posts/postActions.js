import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest, { cookies } from "../../services/auth";

export const getRecommendedPosts = createAsyncThunk(
  "posts/get/recommended",
  async (data = {}, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/recommended",
      method: "GET",
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getMyFollowings = createAsyncThunk(
  "posts/get/followings",
  async (data = {}, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/followings",
      method: "GET",
      skipError: true,
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getRecentPosts = createAsyncThunk(
  "posts/get/recent",
  async (data = {}, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/recent",
      method: "GET",
      skipError: true,
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getSimilarByPost = createAsyncThunk(
  "posts/get/similar",
  async (data = {}, { dispatch }) => {
    const res = await apiRequest({
      url: `/post/get/similar?vote_average=${data.vote_average}&vote_count=${data.vote_count}&views_count=${data.views_count}&category=${data.category._id}&followers_count=${data.posted_by.followers_count}&post_id=${data._id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getPost = createAsyncThunk(
  "posts/getById",
  async ({ post_id }, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/byid/" + post_id,
      method: "GET",
    }).then((response) => {
      if (response.data) {
        dispatch(getSimilarByPost(response.data.post));
      }
      return response;
    });
    return res;
  }
);

export const getMyActivePosts = createAsyncThunk(
  "posts/get/my-active-posts/",
  async ({ userId }, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/my-posts?userId=" +userId+ "&status=active",
      method: "GET",
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getMyExpiredPosts = createAsyncThunk(
  "posts/get/my-expired-posts/",
  async ({userId}, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/my-posts?userId=" +userId+ "&status=expired",
      method: "GET",
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getPostDetail = createAsyncThunk(
  async ({ postId }, { dispatch }) => {
    
    const res = await apiRequest({
      url: `post/get/byid/${postId}`,
      method: "GET",
      // data
    }).then((response) => {
      return response;
      
    });
    return res;
  }
  
);
export const getWishListPosts = createAsyncThunk(
  "posts/get/wishlist/",
  async (data, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/wishlist",
      method: "GET",
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getSearchPosts = createAsyncThunk(
  "posts/get/search/",
  async ({ data }, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/get/search",
      method: "POST",
      data,
      // data: {
      //   category: data.category ? data.category : "all",
      //   keyword: "",
      // },
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ data, onSuccess = () => {} }, { dispatch }) => {
    const res = await apiRequest({
      url: "/post/create",
      method: "POST",
      data,
    }).then((response) => {
      if (response.data) {
        onSuccess();
      }
      return response;
    });
    return res;
  }
);

export const createReview = createAsyncThunk(
  "posts/create",
  async ({ data, cb = () => {} }, { dispatch }) => {
    const res = await apiRequest({
      url: "/review/create",
      method: "POST",
      data,
    }).then((response) => {
      cb();
      dispatch(getPost({ post_id: data.post }));
      return response;
    });
    return res;
  }
);
