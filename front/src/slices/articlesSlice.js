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

    changeTheCartQuantity(state, { payload }) {
      let indexArticle = null;
      const findArticle = state.cart.find((article, index) => {
        if (article.id === payload.id) {
          indexArticle = index;
          return article;
        }
        return undefined;
      });

      if (findArticle !== undefined) {
        state.cart[indexArticle].quantity = Number(payload.value);
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },

    removeFromCart(state, { payload }) {
      const result = state.cart.filter((article) => article.id !== payload);
      state.cart = result;
      localStorage.setItem("CART", JSON.stringify(result));
    },
  },
});

export const {
  setArticlesData,
  getOldCart,
  addToCart,
  changeTheCartQuantity,
  removeFromCart,
} = articlesSlice.actions;
export default articlesSlice.reducer;
