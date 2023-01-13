import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axiosConfig";

const initialState = {
    isLoading: false,
    products: [],
    categories: [],
    error: "",
};
export const getProducts = createAsyncThunk(
  "/articles",
  async (_,{ rejectWithValue }) => {
    try {
        const { data } = await instance.get(`/articles`);
        return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "/categories",
  async (_,{ rejectWithValue }) => {
    try {
        const { data } = await instance.get(`/categories`);
        return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "/article",
  async (payload,{ rejectWithValue }) => {
    try {
        const { data } = await instance.post(`/article`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.products = payload;
    });
    builder.addCase(getProducts.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    });

    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.categories = payload;
    });
    builder.addCase(getCategories.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
