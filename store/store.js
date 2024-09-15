// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
import adminReducer from "./slices/adminSlice"; // Admin slice
import loggerMiddleware from "./middleware/loggerMiddleware"; // Logger middleware

const store = configureStore({
  reducer: {
    customer: customerReducer,
    cart: cartReducer,
    admin: adminReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
