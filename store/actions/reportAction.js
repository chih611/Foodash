import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCurrentMonthCateSalesAPI,
  fetchSaleReportsAPI,
  fetchSalesByMonthAPI,
} from "../api/report.api";

export const fetchCurrentMonthCateSales = createAsyncThunk(
  "orderDetail/fetchCurrentMonthCateSales",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCurrentMonthCateSalesAPI();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchSalesByMonth = createAsyncThunk(
  "orderDetail/fetchSalesByMonth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSalesByMonthAPI();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchSaleReport = createAsyncThunk(
  "orderDetail/fetchSaleReport",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSaleReportsAPI();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
