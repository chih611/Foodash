import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import adminReducer from "./slices/adminSlice"; // Admin slice
import loggerMiddleware from "./middleware/loggerMiddleware"; // Logger middleware
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "js-cookie";
import { combineReducers } from "redux";
import orderReducer from "./slices/orderSlice";
import orderListReducer from "./slices/orderSlice";
import orderDetailReducer from "./slices/orderDetailSlice";

const persistConfig = {
  key: "root",
  storage, // Use localStorage for other slices
  blacklist: ["order", "orderDetail", "ordersToday", "customer"],
};

// Cookie-based persist config for customer slice
const cookiePersistConfig = {
  key: "customer",
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: 365 * 24 * 60 * 60 * 1000, // 1 year expiration for cookies
    },
    secure: true, // Set to true in production for HTTPS
    sameSite: "strict",
  }),
};

// Combine all the reducers
const rootReducer = combineReducers({
  customer: persistReducer(cookiePersistConfig, customerReducer),
  cart: cartReducer,
  admin: adminReducer,
  items: itemsReducer,
  category: categoryReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer,
  ordersToday: orderListReducer,
});

// Create the persisted reducer for the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer and include loggerMiddleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(loggerMiddleware),
});

// Export the persistor and store
export const persistor = persistStore(store);
export default store;
