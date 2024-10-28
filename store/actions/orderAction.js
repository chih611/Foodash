import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderLisByIdAPI,
  fetchOrderListAPI,
  fetchOrderLisByCustomerNameAPI,
  fetchOrderByCustomerIdAPI,
  fetchOrderLisByDuedateAPI,
  fetchOrderListTodayAPI,
  updateOrderAPI,
  updateOrderViewByIdAPI,
  fetchTotalOrderListAPI,
  fetchOrderListByTodayAPI,
} from "../api/order.api";
import axios from "axios";

const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:8080`;

const createOrder = createAsyncThunk(
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

const getOrderById = createAsyncThunk(
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

const fetchOrderByCustomerId = createAsyncThunk(
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

const fetchOrderList = createAsyncThunk(
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
const updateOrder = createAsyncThunk(
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

const updateOrderViewById = createAsyncThunk(
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

const fetchOrderListById = createAsyncThunk(
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

const fetchOrderLisByCustomerName = createAsyncThunk(
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

const fetchOrderListByToday = createAsyncThunk(
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

const fetchOrderListByDuedate = createAsyncThunk(
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

const fetchOrderListToday = createAsyncThunk(
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
const fetchTotalOrderList = createAsyncThunk(
  "order/fetchTotalOrderList",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTotalOrderListAPI();
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export {
  createOrder,
  getOrderById,
  fetchOrderByCustomerId,
  fetchOrderList,
  updateOrder,
  updateOrderViewById,
  fetchOrderListById,
  fetchOrderLisByCustomerName,
  fetchOrderListByToday,
  fetchOrderListByDuedate,
  fetchOrderListToday,
  fetchTotalOrderList,
};