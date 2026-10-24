import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";

import { canStorePreferences, CONSENT_CHANGED } from "../utils/consent";

const CART_KEY = "cartItems";

const loadCartFromStorage = () => {

  // Without consent the cart lives in memory for this visit only
  if (!canStorePreferences()) return [];

  try {

    const savedCart =
      localStorage.getItem(CART_KEY);

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  } catch {

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

const saveCart = () => {
  try {
    if (canStorePreferences()) {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(store.getState().cart.cartItems)
      );
    } else {
      localStorage.removeItem(CART_KEY);
    }
  } catch {
    // storage unavailable (private mode, quota): keep the in-memory cart
  }
};

store.subscribe(saveCart);

// Granting consent saves the current cart; withdrawing it removes the saved copy
window.addEventListener(CONSENT_CHANGED, saveCart);

export default store;
