import { configureStore } from "@reduxjs/toolkit";
import tokenSlicer from "@/slices/api/tokenSlice";
import userSlicer from "@/slices/api/userSlice";

export const store = configureStore({
  reducer: {
    token: tokenSlicer,
    user: userSlicer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
