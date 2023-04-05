import { createSlice } from "@reduxjs/toolkit";
import { cookies } from "../../services/auth";
import { notify } from "../../utlis/handler";
import {
  getMyActivePosts,
  getMyExpiredPosts,
  getMyFollowings,
  getPost,
  getRecentPosts,
  getRecommendedPosts,
  getSearchPosts,
  getSimilarByPost,
  getWishListPosts,
  getPostDetail
} from "./postActions";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    recommendedPosts: [],
    recentPosts: [],
    similarPosts: [],
    activePosts: [],
    expiredPosts: [],
    wishlistPosts: [],
    searchedPosts: [],
    categories: [],
    myFollowingPosts: [],
    currentViewedPost: {
      post:null,
      answers:[]
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // you can mutate state directly, since it is using immer behind the scenes
    builder
      .addCase(getRecommendedPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRecommendedPosts.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.data) state.recommendedPosts = action.payload.data;
      })
      .addCase(getRecommendedPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getRecentPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRecentPosts.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.data)  state.recentPosts = action.payload.data;
      })
      .addCase(getRecentPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSimilarByPost.pending, (state, action) => {
        state.loading = true;
        state.similarPosts = [];
      })
      .addCase(getSimilarByPost.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.data) state.similarPosts = action.payload.data;
      })
      .addCase(getSimilarByPost.rejected, (state, action) => {
        state.loading = false;
        state.similarPosts = [];
      })
      .addCase(getPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.data){
          state.currentViewedPost = action.payload.data;
        }
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyActivePosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyActivePosts.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.data) state.activePosts = action.payload.data;
      })
      .addCase(getMyActivePosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyExpiredPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyExpiredPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.expiredPosts = action.payload.data;
      })
      .addCase(getMyExpiredPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getWishListPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getWishListPosts.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.data) state.wishlistPosts = action.payload.data;
      })
      .addCase(getWishListPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSearchPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSearchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedPosts = action.payload.data || [];
      })
      .addCase(getSearchPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyFollowings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyFollowings.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.data) state.myFollowingPosts = action.payload.data || [];
      })
      .addCase(getMyFollowings.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getPostDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentViewedPost = action.payload.data;
      })
      .addCase(getPostDetail.rejected, (state, action) => {
        state.loading = false;
      });
      
     
  },
});

export default postSlice.reducer;
