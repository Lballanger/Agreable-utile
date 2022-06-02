import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userSlice from "../slices/userSlice";
import articlesSlice from "../slices/articleSlice";

const reducer = combineReducers({
  userSlice,
  articlesSlice,
});

const store = configureStore({
  reducer,
});

export default store;
