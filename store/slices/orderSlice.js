import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderList } from "../actions/orderAction";
import { clearCategoryFilter } from "./categorySlice";

const initialState = {
  ordersList: null,
  status: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        console.log(state.items);
        state.ordersList = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrderList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Fetching API is failed!" };
      });
  },
});

// export const { ordersList, status, error } = orderSlice.actions;
export default orderSlice.reducer;
