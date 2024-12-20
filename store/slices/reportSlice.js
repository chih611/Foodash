import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentMonthCateSales,
  fetchSaleReport,
  fetchSalesByMonth,
  fetchSaleSumByMonth,
  fetchSaleMethodThisMonth,
} from "../actions/reportAction";

const initialState = {
  currentMonthCateSales: null,
  saleSumByMonth: null,
  saleReports: null,
  salesByMonth: null,
  salesMedthod: null,
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
      })
      .addCase(fetchSaleSumByMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaleSumByMonth.fulfilled, (state, action) => {
        state.saleSumByMonth = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSaleSumByMonth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })

      .addCase(fetchSaleMethodThisMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaleMethodThisMonth.fulfilled, (state, action) => {
        state.salesMedthod = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSaleMethodThisMonth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })
      ;
  },
});

export default reportSlice.reducer;
