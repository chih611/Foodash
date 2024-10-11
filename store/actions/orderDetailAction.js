import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetailListAPI } from "../api/orderDetail.api";

export const fetchOrderDetailList = createAsyncThunk(
  "orderDetail/fetchOrderDetailList",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await new Promise(
        (resolve) =>
          setTimeout(async () => {
            const data = await fetchOrderDetailListAPI(orderId); // Replace with your actual API call
            resolve(data);
          }, 500) // 3 seconds delay
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
