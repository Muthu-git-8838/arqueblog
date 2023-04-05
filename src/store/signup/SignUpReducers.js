import { createSlice } from "@reduxjs/toolkit";
import { cookies } from "../../services/auth";
import { notify } from "../../utlis/handler";
import { signup, createRandomGuest } from "./SignUpActions";

const initialState = {
  signUpData: null,
  loading: false,
};

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signUpCleanUp: (state, payload) => {
      state.signUpData = null;
    },
  },
  extraReducers: (builder) => {
    // you can mutate state directly, since it is using immer behind the scenes
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpData = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.signUpData = action.payload;
      });
  },
});

export const { signUpCleanUp } = signUpSlice.actions;

export default signUpSlice.reducer;
