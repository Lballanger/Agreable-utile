import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = createAsyncThunk(
  "/articles",
  async (_,{ rejectWithValue }) => {
    try {
        const { data } = await instance.get(`/articles`);
        console.log(data);
        return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products ",
  initialState: {
    isLoading: false,
    products: [],
    categories: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.products = payload;
      state.categories = payload.categories;
    });
    builder.addCase(getProducts.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
