import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch items by category
export const fetchItemsByCategory = createAsyncThunk(
  "category/fetchItemsByCategory",
  async (categoryName) => {
    const response = await axios.get(
      `http://localhost:8888/items/category/${categoryName}`
    );
    return response.data;
  }
);

// Thunk to fetch all categories
export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async () => {
    const response = await axios.get("http://localhost:8888/category"); // Adjust the URL based on your API
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryItems: [], // Items for a specific category
    categories: [], // All categories
    status: "idle", // Loading status for category items
    categoryStatus: "idle", // Loading status for categories
    error: null, // Error for category items
    categoryError: null, // Error for categories
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchItemsByCategory
    builder
      .addCase(fetchItemsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryItems = action.payload;
      })
      .addCase(fetchItemsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Handle fetchAllCategories
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.categoryStatus = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoryStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.categoryStatus = "failed";
        state.categoryError = action.error.message;
      });
  },
});

export default categorySlice.reducer;
