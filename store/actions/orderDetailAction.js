import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetailListAPI } from "../api/orderDetail.api";
import axios from "axios";

const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:${BACKEND_PORT}`;

export const createOrderDetail = createAsyncThunk(
  "orderDetail/createOrderDetail",
  async (
    { ORDER_ID, UNIT_PRICE, TOTAL, QUANTITY, LABEL_ID, NOTES, ITEM_ID },
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
      });
      return response.data;
    } catch (error) {
      console.error("Error in createOrderDetail:", error); // Add this for debugging
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

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
