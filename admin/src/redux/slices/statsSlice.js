import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axiosConfig";

const initialState = {
  stats: {
    totalCustomers: null,
    dailySales: [],
    monthlySales: [],
    yearlySales: [],
    salesPerCategory: [],
    dashboardData: null,
  },
  isLoading: false,
  error: null,
};

export const getDashboardStats = createAsyncThunk(
  "/stats/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/stats/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getYearlySales = createAsyncThunk(
  "/stats/yearly",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/stats/yearly");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMonthlySales = createAsyncThunk(
  "/stats/monthly",
  async (params, { rejectWithValue }) => {
    try {
      const response = await instance.get("/stats/monthly", {params});
      const convertedData = response.data.map((item) => ({
        ...item,
       totalsales: parseInt(item.totalsales),
       totalunits: parseInt(item.totalunits),
       }));
       
      return convertedData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDailySales = createAsyncThunk(
  "/stats/daily",
  async (params, { rejectWithValue }) => {
    try {
      const response = await instance.get("/stats/daily", {params});    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getYearlySales.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getYearlySales.fulfilled, (state, { payload }) => {
      state.stats.yearlySales = payload;
      state.isLoading = false;
    });
    builder.addCase(getYearlySales.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });

    builder.addCase(getMonthlySales.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMonthlySales.fulfilled, (state, { payload }) => {
      state.stats.monthlySales = payload;
      state.isLoading = false;
    });
    builder.addCase(getMonthlySales.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });

    builder.addCase(getDailySales.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDailySales.fulfilled, (state, { payload }) => {
      state.stats.dailySales = payload;
      state.isLoading = false;
    });
    builder.addCase(getDailySales.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });

    builder.addCase(getDashboardStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDashboardStats.fulfilled, (state, { payload }) => {
      state.stats.dashboardData = payload;
      state.isLoading = false;
    });
    builder.addCase(getDashboardStats.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });
  },
});

export const {} = statsSlice.actions;
export default statsSlice.reducer;
