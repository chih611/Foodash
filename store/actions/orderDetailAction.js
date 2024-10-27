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

      if (!orders || orders.length === 0) {
        return [];
      }

      // Fetch order details for each order to gather all items
      let allItems = [];
      for (const order of orders) {
        const response = await axios.get(
          `${BASE_URL}/order_details/${order.ORDER_ID}`
        );
        const orderDetails = response.data;

        // Ensure only objects are added to allItems
        if (Array.isArray(orderDetails)) {
          orderDetails.forEach((item) => {
            if (item && typeof item === "object" && !Array.isArray(item)) {
              allItems.push(item);
            }
          });
        }
      }

      // Use a Map to ensure uniqueness based on `Product Name`
      const uniqueItemsMap = new Map();
      allItems.forEach((item) => {
        // Ensure `Product` (or a unique field) is used to track duplicates
        if (item && item.Product && !uniqueItemsMap.has(item.Product)) {
          uniqueItemsMap.set(item.Product, item);
        }
      });

      // Convert the Map back to an array
      const uniqueItems = Array.from(uniqueItemsMap.values());
      // console.log("Unique Items:", uniqueItems);
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
      const data = await fetchOrderDetailListAPI(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
