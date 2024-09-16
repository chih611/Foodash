// src/store/slices/itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8888/item");
      let data = response.data;

      // Log the raw data from the response
      console.log("Raw data from backend:", data);

      // If the data is not an array, wrap it in an array
      if (!Array.isArray(data)) {
        data = [data];
      }

      // Log the processed data
      console.log("Processed data:", data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    selectedItem: null, // Add selectedItem to store the clicked item
    status: "idle",
    error: null,
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },

    selectItems: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchItems
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearItems, selectItems } = itemsSlice.actions;
export default itemsSlice.reducer;
