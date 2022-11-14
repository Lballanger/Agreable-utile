import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userSlice from "../slices/userSlice";
import articlesSlice from "../slices/articlesSlice";
import orderSlice from "../slices/orderSlice";
import cartSlice from "../slices/cartSlice";

const reducer = combineReducers({
  userSlice,
  articlesSlice,
  orderSlice,
  cartSlice,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
