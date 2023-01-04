import { configureStore, combineReducers } from "@reduxjs/toolkit";

import globalSlice from "../slices/globalSlice";
import authSlice, { authUser } from "../slices/authSlice";
import usersSlice from "../slices/usersSlice";
import productsSlice from "../slices/productsSlice";
import paymentsSlice from "../slices/paymentsSlice";


const reducer = combineReducers({
    globalSlice,
    authSlice,
    usersSlice,
    productsSlice,
    paymentsSlice,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

store?.dispatch(authUser(null));

export default store;
