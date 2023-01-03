import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axiosConfig";

const initialState = {
  users: null,
  isLoading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk(
  "/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "/user",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.put("/users", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Get All User */
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
