import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userSlice from "../slices/userSlice";
import articlesSlice from "../slices/articlesSlice";
import orderSlice from "../slices/orderSlice";

const reducer = combineReducers({
  userSlice,
  articlesSlice,
  orderSlice,
});

const store = configureStore({
  reducer,
});

export default store;
