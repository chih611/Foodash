import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderListAPI } from "../api/order.api";

export const fetchOrderList = createAsyncThunk(
  "order/fetchOrderList",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOrderListAPI();
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
