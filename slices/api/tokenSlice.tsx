import { tokenStatus } from "@/types/tokenStatus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchToken = createAsyncThunk("api/fetchToken", async () => {
  try {
    const token = (await AsyncStorage.getItem("token")) ?? "";
    return token;
  } catch (error) {
    console.error(error);
    return "";
  }
});

export const removeToken = createAsyncThunk("api/removeToken", async () => {
  await AsyncStorage.removeItem("token");
  return "";
});

interface tokenState {
  value: string;
  status: tokenStatus;
}

const initialState: tokenState = {
  value: "",
  status: tokenStatus.idle,
};

// Then, handle actions in your reducers:
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        // Add user to the state array
        state.value = action.payload;
        state.status = tokenStatus.succeeded;
      })
      .addCase(fetchToken.pending, (state) => {
        state.status = tokenStatus.pending;
      })
      .addCase(fetchToken.rejected, (state) => {
        state.status = tokenStatus.failed;
      })
      .addCase(removeToken.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = tokenStatus.deleted;
      })
      .addCase(removeToken.pending, (state) => {
        state.status = tokenStatus.pending;
      })
      .addCase(removeToken.rejected, (state) => {
        state.status = tokenStatus.failed;
      });
  },
});

export const {} = tokenSlice.actions;

export default tokenSlice.reducer;
