import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCurrentMonthCateSalesAPI,
  fetchSaleReportsAPI,
  fetchSalesByMonthAPI,
  fetchSaleSumByMonthAPI,
  fetchSaleMethodThisMonthAPI,
} from "../api/report.api";

const fetchCurrentMonthCateSales = createAsyncThunk(
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

const fetchSalesByMonth = createAsyncThunk(
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

const fetchSaleReport = createAsyncThunk(
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
const fetchSaleSumByMonth = createAsyncThunk(
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

const fetchSaleMethodThisMonth = createAsyncThunk(
  "report/fetchSaleMethod",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSaleMethodThisMonthAPI();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export {
  fetchCurrentMonthCateSales,
  fetchSalesByMonth,
  fetchSaleReport,
  fetchSaleSumByMonth,
  fetchSaleMethodThisMonth,
};