import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 8080; // Default to port 8888 if env variable isn't set
const BASE_URL = `http://localhost:${BACKEND_PORT}`;

// Async thunk to create a customer (sign up)
export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/create`,
        customerData
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Failed to create customer"
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch the customer profile
export const fetchCustomerProfile = createAsyncThunk(
  "customer/fetchCustomerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.example.com/customers/profile");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    profile: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCustomerProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = customerSlice.actions;
export default customerSlice.reducer;
