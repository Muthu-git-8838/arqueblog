import { createSlice } from '@reduxjs/toolkit';
import { cookies } from '../../services/auth';
import { notify } from '../../utlis/handler';
import { getPostTypes } from './postTypeAction';

const initialState = {
  postTypes: [],
  loading: false
}


const postTypeSlice = createSlice({
  name: 'postType',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // you can mutate state directly, since it is using immer behind the scenes
    builder
      .addCase(getPostTypes.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getPostTypes.fulfilled, (state, action) => {
        state.loading = false
        state.postTypes = action.payload.data
      })
      
      .addCase(getPostTypes.rejected, (state, action) => {
        state.loading = false
      })
  },
});

export default postTypeSlice.reducer;