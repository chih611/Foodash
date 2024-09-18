import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
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
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export const persistor = persistStore(store);
export default store;
