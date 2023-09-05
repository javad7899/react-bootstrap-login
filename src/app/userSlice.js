import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {hostName} from "../config";
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(`${hostName}/api/login`, userCredentials);
    const response = await request.data.data;
    localStorage.setItem("user".JSON.stringify(response));
    return response;
  }
);

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state,action)=>{
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state,action)=>{
      state.isLoading = false;
      state.user = null;
      state.error = action.error.message;
    })
  },
});

export default userSlice.reducer;
