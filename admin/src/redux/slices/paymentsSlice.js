import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axiosConfig";

const initialState = {
  isLoading: false,
  payments: [],
  error: "",
};
export const findAllPayments = createAsyncThunk(
  "/payments",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/payments`, { params });
      return data;
    } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      throw error;
    }
    }
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAllPayments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findAllPayments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.payments = payload;
    });
    builder.addCase(findAllPayments.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const {} = paymentsSlice.actions;
export default paymentsSlice.reducer;
