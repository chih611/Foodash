import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import adminReducer from "./slices/adminSlice"; // Admin slice
import loggerMiddleware from "./middleware/loggerMiddleware"; // Logger middleware
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import { combineReducers } from "redux";

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Combine all the reducers
const rootReducer = combineReducers({
  customer: customerReducer,
  cart: cartReducer,
  admin: adminReducer,
  items: itemsReducer,
  category: categoryReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
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
export const persistor = persistStore(store);
export default store;
