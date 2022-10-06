import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axiosConfig";

export const fetchOrders = createAsyncThunk("/orders", async (payload) => {
  const response = await instance.get("/orders", payload);
  return response.data;
});

export const createOrder = createAsyncThunk("/order", async (payload) => {
  const response = await instance.post("/order", payload);
  return response.data;
});

export const createAddress = createAsyncThunk("/address", async (payload) => {
  const response = await instance.post("/address", payload);
  return response.data;
});

export const paymentIntent = createAsyncThunk("/payment", async (payload) => {
  const response = await instance.post("/payment", { cart: payload });

  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
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

    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
