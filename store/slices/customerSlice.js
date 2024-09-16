import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      });
  },
});

export const { clearProfile } = customerSlice.actions;
export default customerSlice.reducer;
