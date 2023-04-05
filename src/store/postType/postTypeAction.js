import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../services/auth";

export const getPostTypes = createAsyncThunk(
  'postType',
  async (data, { dispatch }) => {
    const res = await apiRequest({
      url: "/posttype",
      method: "GET",
      data,
    }).then((response) => {
      console.log("response",response);

      return response;
    });

    return res;
  }
);

