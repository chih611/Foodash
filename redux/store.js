import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import adminReducer from "./slices/adminSlice";
import notificationReducer from "./slices/notificationSlice";
import { appApi } from "./services/appApi";

const store = configureStore({
  reducer: {
    customer: customerReducer,
    admin: adminReducer,
    notifications: notificationReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export default store;
