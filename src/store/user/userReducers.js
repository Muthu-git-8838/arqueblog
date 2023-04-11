import { createSlice } from "@reduxjs/toolkit";
import { cookies } from "../../services/auth";
import { notify } from "../../utlis/handler";
import {
  followUser,
  // getMyFollowings,
  getProfile,
  getPublicProfile,
  unfollowUser,
} from "./userActions";

const loginSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isLoggedIn: false,
    myFollowingUsers: [],
    profile: {
      _id: null,
      followers: [],
      wishlist: [],
      categories: [],
      user_attachments:[]

    },
    publicProfile: {
      _id: null,
      followers: [],
      wishlist: [],
      categories: [],
      user_attachments:[]

    },
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // you can mutate state directly, since it is using immer behind the scenes
    builder
      .addCase(getProfile.pending, (state, action) => {
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.profile = action.payload.data;
          state.isLoggedIn = true;
        } else if (cookies.get("SID")) {
          cookies.remove("SID");
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(followUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(unfollowUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getPublicProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.publicProfile = action.payload.data;
      })
      .addCase(getPublicProfile.rejected, (state, action) => {
        state.loading = false;
      })
  },
});
export default loginSlice.reducer;
