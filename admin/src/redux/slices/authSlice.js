import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils/tokenStorage";
import instance from "../api/axiosConfig";


const initialState = {
  token: getToken() || null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "/auth/login",
  async (payload, { rejectWithValue }) => {
    try {
        const response = await instance.post("/auth/login", payload);
        instance.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.refreshToken);
        return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk("/user", async (_, { rejectWithValue}) => {
   try {
      const response = await instance.get("/user");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      removeToken();
      return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    },
  },
  extraReducers: (builder) => {

    /* Login */
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload.accessToken;
      state.isLoading = false;
      state.user = payload;
      state.isAuthenticated = true;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });

    /* Get User */
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
      state.token = null;
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;