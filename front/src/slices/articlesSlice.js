import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: null,
  },
  reducers: {
    setArticlesData(state, { payload }) {
      state.articles = payload;
    },
  },
});

export const { setArticlesData } = articlesSlice.actions;
export default articlesSlice.reducer;
