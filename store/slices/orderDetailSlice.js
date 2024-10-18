import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrderDetailList,
  createOrderDetail,
  fetchBoughtBeforeByCustomerId,
} from "../actions/orderDetailAction";

const initialState = {
  orderDetailList: null,
  uniqueItems: [],
  status: null,
  error: null,
};

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetailList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderDetailList.fulfilled, (state, action) => {
        state.orderDetailList = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderDetailList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })
      .addCase(createOrderDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderDetail.fulfilled, (state, action) => {
        state.orderDetailList = action.payload;
        state.status = "succeeded";
      })
      .addCase(createOrderDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Creating order detail is failed!",
        };
      })
      .addCase(fetchBoughtBeforeByCustomerId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoughtBeforeByCustomerId.fulfilled, (state, action) => {
        state.uniqueItems = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBoughtBeforeByCustomerId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Fetching bought before by customer ID is failed!",
        };
      });
  },
});

export default orderDetailSlice.reducer;
