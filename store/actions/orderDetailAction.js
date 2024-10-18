import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetailListAPI } from "../api/orderDetail.api";
import axios from "axios";
import { fetchOrderByCustomerIdAPI } from "../api/order.api";

const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:8080`;

export const createOrderDetail = createAsyncThunk(
  "orderDetail/createOrderDetail",
  async (
    {
      ORDER_ID,
      UNIT_PRICE,
      TOTAL,
      QUANTITY,
      LABEL_ID,
      NOTES,
      ITEM_ID,
      MODIFICATION,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/order_detail/create`, {
        ORDER_ID,
        UNIT_PRICE,
        TOTAL,
        QUANTITY,
        LABEL_ID,
        NOTES,
        ITEM_ID,
        MODIFICATION,
      });
      return response.data;
    } catch (error) {
      console.error("Error in createOrderDetail:", error); // Add this for debugging
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchBoughtBeforeByCustomerId = createAsyncThunk(
  "orderDetail/fetchBoughtBeforeByCustomerId",
  async (customerId, { rejectWithValue, dispatch }) => {
    try {
      // Fetch orders by customer ID
      const orders = await fetchOrderByCustomerIdAPI(customerId);
      console.log("Orders:", orders);

      if (!orders || orders.length === 0) {
        return [];
      }

      // Fetch order details for each order to gather all items
      let allItems = [];
      for (const order of orders) {
        console.log("Order:", order.ORDER_ID);

        // Fetch order details for this specific order
        const response = await axios.get(
          `${BASE_URL}/order_details/${order.ORDER_ID}`
        );
        const orderDetails = response.data;

        console.log("Order Details:", order.ORDER_ID, orderDetails);
        allItems = [...allItems, ...orderDetails];
        console.log("All Items:", allItems);
      }

      // Use a Map to ensure uniqueness based on ITEM_ID
      const uniqueItemsMap = new Map();
      allItems.forEach((item) => {
        if (!uniqueItemsMap.has(item.ITEM_ID)) {
          uniqueItemsMap.set(item.ITEM_ID, item);
        }
      });

      // Convert the Map back to an array
      const uniqueItems = Array.from(uniqueItemsMap.values());
      return uniqueItems;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchOrderDetailList = createAsyncThunk(
  "orderDetail/fetchOrderDetailList",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/order_detail/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
