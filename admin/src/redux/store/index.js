import { configureStore, combineReducers } from "@reduxjs/toolkit";

import globalSlice from "../slices/globalSlice";
import authSlice, { getUser } from "../slices/authSlice";
import productsSlice from "../slices/productsSlice";


const reducer = combineReducers({
    globalSlice,
    authSlice,
    productsSlice,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

store?.dispatch(getUser(null));

export default store;
