import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axiosConfig";

export const fetchOrdersByUserId = createAsyncThunk(
  "/orders",
  async (payload) => {
    const response = await instance.get("/orders", payload);
    return response.data;
  },
);

export const createOrder = createAsyncThunk("/order", async (payload) => {
  const response = await instance.post("/order", payload);
  return response.data;
});

export const createGuestRegistration = createAsyncThunk(
  "/guest",
  async (payload) => {
    console.log(payload);
    const response = await instance.post("/guest", payload);
    return response.data;
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    address: null,
    error: "",
  },
  reducers: {
    addGuestCheckout(state, { payload }) {
      state.address = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrdersByUserId.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { addGuestCheckout } = orderSlice.actions;

export default orderSlice.reducer;
