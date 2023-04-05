import { createSlice } from '@reduxjs/toolkit';
import { cookies } from '../../services/auth';
import { notify } from '../../utlis/handler';
import { login } from './loginActions';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    forgotPasswordData: null,
    updatePasswordData: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // you can mutate state directly, since it is using immer behind the scenes
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.data && action.payload.data.accessToken) {
          // notify('Login successful', 'success')
          cookies.set('SID', action.payload.data.accessToken, { path: '/' });
          // localStorage.setItem('user', JSON.stringify(action.payload.data.user))
          window.location.reload()
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
      })
  },
});

export default loginSlice.reducer;