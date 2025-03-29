import { configureStore } from "@reduxjs/toolkit";
import tokenSlicer from "@/slices/api/tokenSlice";
import userSlicer from "@/slices/api/userSlice";
import postSlicer from "@/slices/api/postSlice";

export const store = configureStore({
  reducer: {
    token: tokenSlicer,
    user: userSlicer,
    posts: postSlicer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
