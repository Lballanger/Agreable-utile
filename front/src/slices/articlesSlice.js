import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axiosConfig";

export const fetchArticles = createAsyncThunk("/articles", async () => {
  const response = await instance.get("/articles");
  return response.data;
});

export const fetchCategories = createAsyncThunk("/categories", async () => {
  const response = await instance.get("/categories");
  return response.data;
});

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    loading: false,
    articles: [],
    cart: [],
    categories: [],
    subtotal: 0,
    error: "",
  },
  reducers: {
    setArticlesData(state, { payload }) {
      state.articles = payload;
    },

    getOldCart(state) {
      const oldCart = JSON.parse(localStorage.getItem("CART"));
      if (!oldCart) {
        state.cart = [];
      } else {
        state.cart = oldCart;
        oldCart.forEach((article) => {
          state.subtotal += article.quantity * article.price_wt;
        });
      }
    },

    addToCart(state, { payload }) {
      const params = payload;

      const foundArticle = state.cart.find(
        (article) => article.id === payload.id,
      );

      if (foundArticle !== undefined) {
        foundArticle.quantity += payload.quantity;
        const result = state.cart.filter(
          (article) => article.id !== foundArticle.id,
        );
        state.cart = result;
        state.cart.push(foundArticle);
        state.subtotal += Number(payload.price_wt) * payload.quantity;
        localStorage.setItem("CART", JSON.stringify(state.cart));
      } else {
        params.quantity = payload.quantity;
        state.cart.push(params);
        state.subtotal += Number(payload.price_wt) * payload.quantity;
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },

    changeTheCartQuantity(state, { payload }) {
      state.cart.find((article, index) => {
        if (article.id === payload.id) {
          const oldPrice = Number(
            state.cart[index].price_wt * state.cart[index].quantity,
          );
          state.subtotal -= oldPrice;

          state.subtotal += Number(state.cart[index].price_wt * payload.value);

          state.cart[index].quantity = Number(payload.value);
          localStorage.setItem("CART", JSON.stringify(state.cart));
        }
        return undefined;
      });
    },

    removeFromCart(state, { payload }) {
      const findArticle = state.cart.find((article) => article.id === payload);
      state.subtotal -= findArticle.price_wt * findArticle.quantity;
      const result = state.cart.filter((article) => article.id !== payload);
      state.cart = result;
      localStorage.setItem("CART", JSON.stringify(result));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
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
