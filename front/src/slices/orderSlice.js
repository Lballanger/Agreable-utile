import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axiosConfig";

export const createAddress = createAsyncThunk("/address", async (payload) => {
  const response = await instance.post("/address", payload);
  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: null,
    address: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.address = action.payload;
    });
    builder.addCase(createAddress.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
