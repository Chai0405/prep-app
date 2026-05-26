import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";

const loadCartFromStorage = () => {

  try {

    const savedCart =
      localStorage.getItem("cartItems");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  } catch (error) {

    return [];

  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState: {
    cart: {
      cartItems: loadCartFromStorage(),
    },
  },
});

store.subscribe(() => {

  localStorage.setItem(
    "cartItems",

    JSON.stringify(
      store.getState().cart.cartItems
    )
  );
});

export default store;