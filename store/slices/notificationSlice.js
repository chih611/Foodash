import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    message: null,
    type: null, // 'success' or 'error'
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
