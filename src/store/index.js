import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "./login/loginReducers";
import SignUpReducers from "./signup/SignUpReducers";
import PostReducers from "./posts/postReducers";
import UserReducers from "./user/userReducers";
import CommonReducer from './common/CommonReducers'
import postTypeReducer from './postType/postTypeReducer'


export const store = configureStore({
  reducer: {
    login: loginReducers,
    signup: SignUpReducers,
    post:PostReducers,
    user:UserReducers,
    common:CommonReducer,
    postType:postTypeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});
