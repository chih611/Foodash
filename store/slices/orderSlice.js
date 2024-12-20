import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrderLisByCustomerName,
  fetchOrderList,
  fetchOrderListById,
  createOrder,
  getOrderById,
  fetchOrderByCustomerId,
  fetchOrderListToday,
  updateOrder,
  fetchOrderListByToday,
  fetchOrderListByDuedate,
  updateOrderViewById,
  fetchTotalOrderList,
} from "../actions/orderAction";

const initialState = {
  ordersList: null,
  orderListByCustomerId: null,
  orderListByName: null,
  orderListByDuedate: null,
  orderListToday: null,
  orderById: null,
  total_order: null,
  status: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderByCustomerId: (state) => {
      state.orderListByCustomerId = null;
    },
  },
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
      .addCase(getOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderById = action.payload;
        state.status = "succeeded";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Fetching API by orderId failed!",
        };
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
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        // state.orderById = action.payload;
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Creating order is failed!" };
      })
      .addCase(fetchOrderByCustomerId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByCustomerId.fulfilled, (state, action) => {
        state.orderListByCustomerId = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderByCustomerId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Fetching API by customerId failed!",
        };
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
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        // state.orderById = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Updating order is failed!" };
      })
      .addCase(updateOrderViewById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderViewById.fulfilled, (state, action) => {
        // state.orderById = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateOrderViewById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Updating order view by Id is failed!",
        };
      })
      .addCase(fetchTotalOrderList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTotalOrderList.fulfilled, (state, action) => {
        state.total_order = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTotalOrderList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Updating order view by Id is failed!",
        };
      })
      .addCase(fetchOrderListByToday.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderListByToday.fulfilled, (state, action) => {
        state.orderListByToday = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderListByToday.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      });
  },
});

// export const { ordersList, status, error } = orderSlice.actions;
export const { clearOrderByCustomerId } = orderSlice.actions;
export default orderSlice.reducer;
