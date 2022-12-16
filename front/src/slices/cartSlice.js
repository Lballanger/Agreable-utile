import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axiosConfig";

export const paymentIntent = createAsyncThunk(
  "/payment",
  async (payload, { getState }) => {
    const state = getState();
    const response = await instance.post("/payment", {
      userId: state.userSlice.userData?.id,
      guestInformation: state.userSlice.userData?.id
        ? null
        : {
            firstname: state.userSlice.userData?.firstname,
            lastname: state.userSlice.userData?.lastname,
            email: state.userSlice.userData?.email,
            country: state.userSlice.userData?.country,
            address: state.userSlice.userData?.address,
            city: state.userSlice.userData?.city,
            postalCode: state.userSlice.userData?.postalCode,
            additionalInfo: state.userSlice.userData?.additionalInfo,
            phone: state.userSlice.userData?.phone,
          },
      cart: state.articlesSlice.cart,
      articles: state.cartSlice.cart,
      delivery: state.cartSlice.delivery,
    });

    return response.data;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: [],
    delivery: null,
    totalQuantity: 0,
    totalAmount: 0,
    error: "",
  },
  reducers: {
    deliverySelected: (state, { payload }) => {
      state.delivery = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { deliverySelected } = cartSlice.actions;

export default cartSlice.reducer;
