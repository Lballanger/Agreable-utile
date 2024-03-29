import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, removeToken } from "../utils/tokenStorage";
import instance from "../utils/axiosConfig";

export const register = createAsyncThunk(
  "/auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/register", payload);
      instance.defaults.headers.authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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

export const createAddress = createAsyncThunk(
  "/address",
  async (payload, { getState }) => {
    const state = getState();
    const response = await instance.post("/address", {
      ...payload,
      userId: state.userSlice.userData.id,
    });
    return response.data;
  },
);

export const fetchAddressesByUserId = createAsyncThunk(
  "address/getByUser",
  async () => {
    const response = await instance.get("/address");
    return response.data;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage?.getItem("REFRESH_KEY") || null,
    loading: false,
    userData: null,
    addresses: [],
    error: "",
  },
  reducers: {
    getToken(state, { payload }) {
      state.token = payload;
    },
    addGuestPersonalInfo(state, { payload }) {
      state.userData = payload;
    },
    addGuestAddress(state, { payload }) {
      state.addresses.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.loading = false;
      state.userData = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.token = null;
      state.userData = null;
    });

    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.token = null;
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.loading = false;
      state.userData = action.payload;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(createAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.addresses.push(action.payload);
    });
    builder.addCase(createAddress.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(fetchAddressesByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddressesByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.addresses = action.payload;
    });
    builder.addCase(fetchAddressesByUserId.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { getToken, addGuestPersonalInfo, addGuestAddress } =
  userSlice.actions;
export default userSlice.reducer;
