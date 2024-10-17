import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderLisByIdAPI,
  fetchOrderListAPI,
  fetchOrderLisByCustomerNameAPI,
  fetchOrderByCustomerIdAPI,
} from "../api/order.api";
import axios from "axios";

const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:8080`;

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ orderData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/order/create`, orderData);
      return response.data; // This will contain the created order details
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOrderByCustomerId = createAsyncThunk(
  "order/fetchOrderByCustomerId",
  async (customerId, { rejectWithValue }) => {
    try {
      return await fetchOrderByCustomerIdAPI(customerId);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchOrderList = createAsyncThunk(
  "order/fetchOrderList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(async () => {
          const data = await fetchOrderListAPI();
          resolve(data);
        }, 500)
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
