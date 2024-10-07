import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetailListAPI } from "../api/orderDetail.api";

export const fetchOrderDetailList = createAsyncThunk(
  "orderDetail/fetchOrderDetailList",
  async (orderId, { rejectWithValue }) => {
    try {
      return await fetchOrderDetailListAPI(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
