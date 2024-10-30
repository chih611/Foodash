// src/store/slices/adminSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;

// const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;
// Async action to fetch admin data

export const fetchAllAdmins = createAsyncThunk(
  "admin/fetchAllAdmins",
  async () => {
    const response = await axios.get(`${BASE_URL}/admin`);

    return response.data;
  }
);

export const signInAsAdmin = createAsyncThunk(
  "admin/signInAsAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/signin`, {
        email,
        password,
      });

      if (response.status === 200) {
        return response.data; // Assume response contains admin profile details
      } else {
        return rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAdminProfileById = createAsyncThunk(
  "admin/fetchAdminProfileById",
  async (adminId) => {
    const response = await axios.get(`${BASE_URL}/admin/${adminId}`);
    const data = await response.json();
    return data;
  }
);

export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (adminData) => {
    const response = await axios.post(`${BASE_URL}/admin/create`, adminData);
    return response.data; // Axios automatically parses the JSON response
  }
);

export const updateAdminProfile = createAsyncThunk(
  "admin/updateAdminProfile",
  async ({ id, updatedData }, { getState, dispatch, rejectWithValue }) => {
    try {
      console.log("id", id);

      // Fetch existing profile using the admin ID
      const existingProfileResponse = await axios.get(
        `${BASE_URL}/admin/${id}`
      );
      const existingProfile = existingProfileResponse.data;
      console.log("existingProfile", existingProfile);

      // Verify the profile exists
      if (!existingProfile) {
        return rejectWithValue("No existing admin profile found.");
      }

      // Prepare data using consistent backend field names
      const adminData = {
        admin_name: updatedData.ADMIN_NAME || existingProfile.admin_name,
        admin_email: updatedData.ADMIN_EMAIL || existingProfile.admin_email,
        admin_password:
          updatedData.ADMIN_PASSWORD || existingProfile.ADMIN_PASSWORD,
        admin_type: updatedData.ADMIN_TYPE || existingProfile.admin_type,
      };

      console.log("adminData prepared for update:", adminData);

      // Send PUT request to update admin details
      const response = await axios.put(
        `${BASE_URL}/admin/update/${id}`,
        adminData
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Failed to update admin");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    profile: null,
    admins: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearAdminData: (state) => {
      state.profile = null;
      state.admins = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // Handle admin profile fetching
    builder
      .addCase(signInAsAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInAsAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(signInAsAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = action.payload;
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAdminProfileById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminProfileById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchAdminProfileById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins.push(action.payload);
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateAdminProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
