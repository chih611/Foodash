import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    inventory: [],
    reports: [],
  },
  reducers: {
    // Other local admin actions, if necessary
  },
});

export default adminSlice.reducer;
