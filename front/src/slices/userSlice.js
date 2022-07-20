import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, removeToken } from "../utils/tokenStorage";
import instance from "../utils/axiosConfig";

export const login = createAsyncThunk("/auth/login", async (payload) => {
  const response = await instance.post("/auth/login", payload);
  instance.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
  setToken(response.data.refreshToken);
  return response.data;
});

export const fetchUserData = createAsyncThunk("/user", async () => {
  const response = await instance.get("/user");
  return response.data;
});

export const signOut = createAsyncThunk("/auth/signOut", async () => {
  removeToken();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userData: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.userData = {};
      state.error = action.error.message;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.userData = null;
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
