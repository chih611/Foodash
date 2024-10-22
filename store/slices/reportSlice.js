import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentMonthCateSales,
  fetchSaleReport,
  fetchSalesByMonth,
} from "../actions/reportAction";

const initialState = {
  currentMonthCateSales: null,
  salesByMonth: null,
  saleReports: null,
  status: null,
  error: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentMonthCateSales.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentMonthCateSales.fulfilled, (state, action) => {
        state.currentMonthCateSales = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCurrentMonthCateSales.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })
      .addCase(fetchSalesByMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSalesByMonth.fulfilled, (state, action) => {
        state.salesByMonth = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSalesByMonth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })
      .addCase(fetchSaleReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaleReport.fulfilled, (state, action) => {
        state.saleReports = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSaleReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      });
  },
});

export default reportSlice.reducer;
