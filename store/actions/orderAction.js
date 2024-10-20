import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderLisByIdAPI,
  fetchOrderListAPI,
  fetchOrderLisByCustomerNameAPI,
  fetchOrderLisByDuedateAPI,
} from "../api/order.api";

export const fetchOrderList = createAsyncThunk(
  "order/fetchOrderList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchOrderListAPI();
      return data;
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
      const data = await fetchOrderLisByIdAPI(orderId);
      return data;
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

export const fetchOrderListByDuedate = createAsyncThunk(
  "order/fetchOrderListByDuedate",
  async (duedate, { rejectWithValue }) => {
    try {
      return await fetchOrderLisByDuedateAPI(duedate);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
