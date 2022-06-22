import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: null,
    cart: [],
  },
  reducers: {
    setArticlesData(state, { payload }) {
      state.articles = payload;
    },

    getOldCart(state) {
      const oldCart = localStorage.getItem("CART");
      if (!oldCart) {
        state.cart = [];
      } else {
        state.cart = JSON.parse(oldCart);
      }
    },

    addToCart(state, { payload }) {
      const params = payload;

      const foundArticle = state.cart.find(
        (article) => article.id === payload.id,
      );

      if (foundArticle !== undefined) {
        foundArticle.quantity += 1;
        const result = state.cart.filter(
          (article) => article.id !== foundArticle.id,
        );
        state.cart = result;
        state.cart.push(foundArticle);
        localStorage.setItem("CART", JSON.stringify(state.cart));
      } else {
        params.quantity = 1;
        state.cart.push(params);
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },
  },
});

export const { setArticlesData, getOldCart, addToCart } = articlesSlice.actions;
export default articlesSlice.reducer;
