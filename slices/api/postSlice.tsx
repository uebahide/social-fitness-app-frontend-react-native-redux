import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "@/constants";
import { store } from "@/app/store";
import { post } from "@/types/post";
import { status } from "@/types/status";

// First, create the thunk
export const fetchPost = createAsyncThunk(
  "api/fetchPost",
  async (_, { rejectWithValue }) => {
    const token = store.getState().token.value;
    try {
      const res = await axios.get<post[]>(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.reverse();
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "Request failed");
    }
  }
);

interface postState {
  value: post[];
  status: status;
}

const initialState: postState = {
  value: [],
  status: status.idle,
};

// Then, handle actions in your reducers:
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPost.fulfilled, (state, action) => {
        // Add user to the state array
        state.value = action.payload;
        state.status = status.succeeded;
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = status.pending;
      })
      .addCase(fetchPost.rejected, (state) => {
        state.status = status.failed;
      });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
function rejectWithValue(data: any): any {
  throw new Error("Function not implemented.");
}
