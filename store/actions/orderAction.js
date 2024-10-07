import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderLisByIdAPI, fetchOrderListAPI } from "../api/order.api";

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

export const fetchOrderListById = createAsyncThunk(
  "order/fetchOrderListById",
  async (orderId, { rejectWithValue }) => {
    try {
      return await fetchOrderLisByIdAPI(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
