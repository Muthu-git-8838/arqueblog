import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest, { cookies } from "../../services/auth";

export const login = createAsyncThunk(
  "login",
  async (data, { dispatch }) => {
    const res = await apiRequest({
      url: "/auth",
      method: "POST",
      data,
    }).then(async (response) => {
      return response;
    });
    return res;
  }
);
