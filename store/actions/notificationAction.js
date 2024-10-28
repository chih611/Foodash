import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotificationsAPI } from "../api/notification.api";

const fetchNotifications = createAsyncThunk(
  "orderDetail/fetchNotifications",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await fetchNotificationsAPI(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export { fetchNotifications };