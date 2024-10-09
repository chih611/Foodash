import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderLisByIdAPI,
  fetchOrderListAPI,
  fetchOrderLisByCustomerNameAPI,
} from "../api/order.api";

export const fetchOrderList = createAsyncThunk(
  "order/fetchOrderList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise(
        (resolve) =>
          setTimeout(async () => {
            const data = await fetchOrderListAPI(); // Replace with your actual API call
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

export const fetchOrderListById = createAsyncThunk(
  "order/fetchOrderListById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await new Promise(
        (resolve) =>
          setTimeout(async () => {
            const data = await fetchOrderLisByIdAPI(orderId); // Replace with your actual API call
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

export const fetchOrderLisByCustomerName = createAsyncThunk(
  "order/fetchOrderListByCustomerName",
  async (orderId, { rejectWithValue }) => {
    try {
      return await fetchOrderLisByCustomerNameAPI(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
