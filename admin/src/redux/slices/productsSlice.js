//productSlice

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axiosConfig";

const initialState = {
  isLoading: false,
  products: [],
  productDetail: null,
  categories: [],
  error: "",
};

export const getProducts = createAsyncThunk(
  "/articles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/articles`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  "/article/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/article/${payload}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductById = createAsyncThunk(
  "/article/update/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/article/${payload.id}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "/article",
  async (payload, { rejectWithValue }) => {
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

export const createCategory = createAsyncThunk(
  "/category",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/category`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "/categories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/categories`);
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
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.products = payload;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.productDetail = payload;
    });
    builder.addCase(getProductById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    builder.addCase(updateProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.productDetail = payload;
    });
    builder.addCase(updateProductById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.categories = payload;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.categories.push(payload);
    });
    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
