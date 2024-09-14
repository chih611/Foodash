// src/store/slices/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch admin data
export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchAdminProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.example.com/admin/profile");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch admin profile");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async action to fetch all users for the admin dashboard
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.example.com/admin/users");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    profile: null,
    users: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearAdminData: (state) => {
      state.profile = null;
      state.users = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // Handle admin profile fetching
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle fetching all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
