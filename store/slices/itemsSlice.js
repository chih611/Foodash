// src/store/slices/itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8888/item");
      let data = response.data;
      if (!Array.isArray(data)) {
        data = [data];
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const searchItemsByName = createAsyncThunk(
  "items/searchItemsByName",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8888/items/search/${searchTerm}`
      );
      return response.data.length > 0 ? response.data : [];
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
    searchResults: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    selectItems: (state, action) => {
      state.selectedItem = action.payload; // Set the selected item
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || { message: "Failed to fetch items" };
      })
      .addCase(searchItemsByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchItemsByName.fulfilled, (state, action) => {
        state.searchResults = action.payload.length > 0 ? action.payload : []; // Keep searchResults empty if no matches
        state.status = "succeeded";
      })
      .addCase(searchItemsByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Error searching items by name",
        };
      });
  },
});

export const { clearSearchResults, selectItems } = itemsSlice.actions;
export default itemsSlice.reducer;
