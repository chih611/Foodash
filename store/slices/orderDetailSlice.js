import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderDetailList } from "../actions/orderDetailAction";

const initialState = {
  orderDetailList: null,
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
      });
  },
});

export default orderDetailSlice.reducer;
