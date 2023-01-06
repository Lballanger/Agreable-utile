import { configureStore, combineReducers } from "@reduxjs/toolkit";

import globalSlice from "../slices/globalSlice";
import authSlice, { authUser } from "../slices/authSlice";
import usersSlice from "../slices/usersSlice";
import productsSlice from "../slices/productsSlice";
import paymentsSlice from "../slices/paymentsSlice";
import statsSlice from "../slices/statsSlice";


const reducer = combineReducers({
    globalSlice,
    authSlice,
    usersSlice,
    productsSlice,
    paymentsSlice,
    statsSlice,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

store?.dispatch(authUser(null));

export default store;
