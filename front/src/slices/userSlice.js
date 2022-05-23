import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUserData(state, { payload }) {
      state.user = payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
