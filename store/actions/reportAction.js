import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCurrentMonthCateSalesAPI,
  fetchSaleReportsAPI,
  fetchSalesByMonthAPI,
  fetchSaleSumByMonthAPI,
} from "../api/report.api";

export const fetchCurrentMonthCateSales = createAsyncThunk(
  "report/fetchCurrentMonthCateSales",
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
  "report/fetchSalesByMonth",
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
  "report/fetchSaleReport",
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

export const fetchSaleSumByMonth = createAsyncThunk(
  "report/fetchSaleSumByMonth",
  async (month, { rejectWithValue }) => {
    try {
      const data = await fetchSaleSumByMonthAPI(month);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

