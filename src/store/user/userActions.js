import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest, { cookies } from "../../services/auth";
import { getPost, getWishListPosts } from "../posts/postActions";

export const getPublicProfile = createAsyncThunk(
  "user/get/public",
  async (data, { dispatch }) => {
    const res = await apiRequest({
      url: `/user/profile/${data.userId}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const getProfile = createAsyncThunk(
  "user/get",
  async (data, { dispatch }) => {
    const res = await apiRequest({
      url: "/user/profile",
      method: "GET",
      skipError: true,
    }).then((response) => {
      return response;
    });
    return res;
  }
);

export const followUser = createAsyncThunk(
  "user/follow",
  async ({ userId }, { dispatch }) => {
    const res = await apiRequest({
      url: "/user/follow",
      method: "POST",
      data: { userId },
    }).then((response) => {
      dispatch(getPublicProfile({ userId }));
      return response;
    });
    return res;
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollow",
  async ({ postId = null, userId }, { dispatch }) => {
    const res = await apiRequest({
      url: "/user/unfollow",
      method: "POST",
      data: { userId },
    }).then((response) => {
      dispatch(getPublicProfile({ userId }));
      return response;
    });
    return res;
  }
);

export const addWishList = createAsyncThunk(
  "user/add-wishlist",
  async ({ postId = null, userId }, { dispatch }) => {
    const res = await apiRequest({
      url: "/user/add-wishlist",
      method: "POST",
      data: { postId },
    }).then((response) => {
      dispatch(getProfile());
      return response;
    });
    return res;
  }
);

export const removeWishList = createAsyncThunk(
  "user/remove-wishlist",
  async ({ postId = null, userId }, { dispatch }) => {
    const res = await apiRequest({
      url: "/user/remove-wishlist",
      method: "POST",
      data: { postId },
    }).then((response) => {
      dispatch(getProfile());
      dispatch(getWishListPosts());
      return response;
    });
    return res;
  }
);

// export const getMyFollowings = createAsyncThunk(
//   "user/followings",
//   async (data = {}, { dispatch }) => {
//     const res = await apiRequest({
//       url: "/user/followings",
//       method: "GET",
//       skipError:true
//     }).then((response) => {
//       return response;
//     });
//     return res;
//   }
// );
