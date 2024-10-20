import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrderLisByCustomerName,
  fetchOrderLisByDuedate,
  fetchOrderList,
  fetchOrderListByDuedate,
  fetchOrderListById,
} from "../actions/orderAction";

const initialState = {
  ordersList: null,
  orderListByName: null,
  orderListByDuedate: null,
  orderById: null,
  status: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.ordersList = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })
      .addCase(fetchOrderListById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderListById.fulfilled, (state, action) => {
        state.orderById = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderListById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })
      .addCase(fetchOrderLisByCustomerName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderLisByCustomerName.fulfilled, (state, action) => {
        state.orderListByName = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderLisByCustomerName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      })
      .addCase(fetchOrderListByDuedate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderListByDuedate.fulfilled, (state, action) => {
        state.orderListByDuedate = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderListByDuedate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      });
  },
});

// export const { ordersList, status, error } = orderSlice.actions;
export default orderSlice.reducer;
