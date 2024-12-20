import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAdminItemByDetailIdAPI,
  fetchAdminItemsAPI,
  fetchModificationsAPI,
  fetchModificationsByIdAPI,
} from "../api/item.api";

const fetchAdminItemByDetailId = createAsyncThunk(
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

const fetchAdminItems = createAsyncThunk(
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

const fetchModifications = createAsyncThunk(
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

const fetchModificationsById = createAsyncThunk(
  "items/fetchModificationsById",
  async (mod_id, { rejectWithValue }) => {
    try {
      return await fetchModificationsByIdAPI(mod_id);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export {
  fetchAdminItemByDetailId,
  fetchAdminItems,
  fetchModifications,
  fetchModificationsById,
};