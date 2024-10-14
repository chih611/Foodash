// src/store/slices/itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define base URL with dynamic backend port from the environment variable
const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:${BACKEND_PORT}`;

// Fetch items thunk
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:${BACKEND_PORT}/item`);
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

export const getItemById = createAsyncThunk(
  "items/getItemById",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/item/${itemId}`);
      console.log(response.data);
      return response[0].data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Search items by name thunk
export const searchItemsByName = createAsyncThunk(
  "items/searchItemsByName",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/items/search/${searchTerm}`
      );
      return response.data.length > 0 ? response.data : [];
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getItemModificationAndLabel = createAsyncThunk(
  "items/getItemModificationAndLabel",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/items/modification/${itemId}`
      );
      console.log("Item modification and label response:", response.data);
      return response.data;
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
    selectedItem: null,
    selectedItemModifications: [],
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
      })
      .addCase(getItemById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        state.status = "succeeded";
      })
      .addCase(getItemById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Error fetching item by ID",
        };
      })
      .addCase(getItemModificationAndLabel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItemModificationAndLabel.fulfilled, (state, action) => {
        state.selectedItemModifications = action.payload;
        state.status = "succeeded";
      })
      .addCase(getItemModificationAndLabel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || {
          message: "Error fetching item modifications and labels",
        };
      });
  },
});

export const { clearSearchResults, selectItems } = itemsSlice.actions;
export default itemsSlice.reducer;
