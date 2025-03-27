import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "@/constants";
import { store } from "@/app/store";
import type { userData } from "@/types/userData";
import type { user } from "@/types/user";
import { FC } from "react";
import { status } from "@/types/status";

// First, create the thunk
export const fetchUser = createAsyncThunk(
  "api/fetchUser",
  async (_, { rejectWithValue }) => {
    const token = store.getState().token.value;
    try {
      const res = await axios.get<user>(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "Request failed");
    }
  }
);

interface userState {
  value: user;
  status: status;
}

const initialState: userState = {
  value: { id: "", name: "", email: "", created_at: "", updated_at: "" },
  status: status.idle,
};

// Then, handle actions in your reducers:
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.value = action.payload;
        state.status = status.succeeded;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = status.pending;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = status.failed;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
function rejectWithValue(data: any): any {
  throw new Error("Function not implemented.");
}
