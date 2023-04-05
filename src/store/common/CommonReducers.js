import { createSlice } from "@reduxjs/toolkit";
import { cookies } from "../../services/auth";
import { notify } from "../../utlis/handler";
import { getCategories, getCurrencies, getProfileTypes } from "./CommonActions";

const initialState = {
  categories: [],
  userTypes: [],
  loading: false,
  currencies: [],
  themeMode: "dark",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.themeMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    // you can mutate state directly, since it is using immer behind the scenes
    builder
      .addCase(getCurrencies.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload.data;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) state.categories = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProfileTypes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProfileTypes.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getProfileTypes.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { updateTheme } = commonSlice.actions;

export default commonSlice.reducer;
