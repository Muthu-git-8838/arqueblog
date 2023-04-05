import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../services/auth";

export const signup = createAsyncThunk(
  //action type string
  "signup",
  // callback function
  async ({ msg, onSuccess = () => {} }, { dispatch }) => {
    const res = await apiRequest({
      url: "/auth/signup",
      method: "POST",
      data: msg,
    }).then((response) => {
      onSuccess();
      // dispatch(createPlayer('12344'));
      return response;
    });
    return res;
  }
);
