import { configureStore, combineReducers } from "@reduxjs/toolkit";

import globalSlice from "../slices/globalSlice";
import productsSlice from "../slices/productsSlice";


const reducer = combineReducers({
    globalSlice,
    productsSlice,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
