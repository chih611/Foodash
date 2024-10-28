import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAdminItemByDetailIdAPI,
  fetchAdminItemsAPI,
  fetchModificationsAPI,
} from "../api/item.api";

export const fetchAdminItemByDetailId = createAsyncThunk(
  "items/fetchAdminItemByDetailId",
  async (item_id, { rejectWithValue }) => {
    try {
      return await fetchAdminItemByDetailIdAPI(item_id);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchAdminItems = createAsyncThunk(
  "items/fetchAdminItemById",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAdminItemsAPI();
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchModifications = createAsyncThunk(
  "items/fetchModifications",
  async (item_id, { rejectWithValue }) => {
    try {
      return await fetchModificationsAPI(item_id);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
