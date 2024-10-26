import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderLisByIdAPI,
  fetchOrderListAPI,
  fetchOrderLisByCustomerNameAPI,
<<<<<<< HEAD
  fetchOrderListByTodayAPI,
  fetchOrderByCustomerIdAPI,
=======
  fetchOrderByCustomerIdAPI,
  fetchOrderLisByDuedateAPI,
  fetchOrderListTodayAPI,
  updateOrderAPI,
  fetchOrderListByTodayAPI,
  updateOrderViewByIdAPI,
>>>>>>> kevin
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
      const data = await fetchOrderListAPI();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, updatedData }, { rejectWithValue }) => {
    try {
      // Use the refactored API function
      const response = await updateOrderAPI(orderId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderViewById = createAsyncThunk(
  "order/updateOrderViewById",
  async ({ orderId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateOrderViewByIdAPI(orderId, updatedData);
      return response; // This will contain the updated order details
    } catch (error) {
      return rejectWithValue(error.message);
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

export const fetchOrderListByToday = createAsyncThunk(
  "order/fetchOrderListByToday",
  async (duedate, { rejectWithValue }) => {
    try {
      return await fetchOrderListByTodayAPI(duedate);
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

export const fetchOrderListToday = createAsyncThunk(
  "order/fetchOrderListToday",
  async (duedate, { rejectWithValue }) => {
    try {
      return await fetchOrderListTodayAPI(duedate);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
