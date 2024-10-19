import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `http://localhost:8080`;

export const fetchItemsByCategory = createAsyncThunk(
  "category/fetchItemsByCategory",
  async (categoryId) => {
    const response = await axios.get(
      `${BASE_URL}/items/category/${categoryId}`
    );
    return response.data;
  }
);

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async () => {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryItems: [],
    categories: [],
    status: "idle",
    categoryStatus: "idle",
    error: null,
    categoryError: null,
  },
  reducers: {
    clearCategoryFilter: (state) => {
      state.categoryItems = [];
    },
  },
  extraReducers: (builder) => {
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

// Explicitly export the clearCategoryFilter action
export const { clearCategoryFilter } = categorySlice.actions;

export default categorySlice.reducer;
