import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `https://${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}`;

/* Utility Functions */

// Check if the customer already exists
const checkIfCustomerExists = async (type, email, phoneNumber) => {
  if (type === "user") {
    return await axios.get(`${BASE_URL}/customer/email/${email}`);
  } else {
    return await axios.get(`${BASE_URL}/customer/contact/${phoneNumber}`);
  }
};

// Create a new customer
const createNewCustomer = async (customerData) => {
  const response = await axios.post(
    `${BASE_URL}/customer/create`,
    customerData
  );
  return response.data;
};

// Handle sign-in request
const handleSignInRequest = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/customer/signin`, {
    email,
    password,
  });
  return response;
};

/* Async Thunks */

// Fetch customer details by ID
export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/${customerId}`);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch customer details");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to sign up a customer (create or upgrade guest to user)
export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const { email, phoneNumber, type } = customerData;

      // Check if the customer already exists
      let existingCustomer;
      try {
        existingCustomer = await checkIfCustomerExists(
          type,
          email,
          phoneNumber
        );
      } catch (error) {
        if (error.response && error.response.status === 404) {
          existingCustomer = null; // Customer not found, proceed to create
        } else {
          throw error;
        }
      }

      if (existingCustomer?.data) {
        // If guest and now signing up as a user, upgrade them
        if (existingCustomer.data.customerType === "guest" && type === "user") {
          const updatedCustomer = await upgradeGuestToUser(
            existingCustomer.data.id,
            customerData
          );
          return updatedCustomer;
        } else {
          return rejectWithValue("Customer already exists as a user.");
        }
      }

      // Create a new customer
      const newCustomer = await createNewCustomer(customerData);
      return newCustomer;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk to sign in a customer
export const signInCustomer = createAsyncThunk(
  "customer/signInCustomer",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await handleSignInRequest(email, password);

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Invalid credentials");
      }
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk to update a customer
export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (
    { customerId, updatedData },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const existingProfile = getState().customer.profile;

      if (!existingProfile) {
        return rejectWithValue("No existing customer profile found.");
      }

      const customerData = {
        ...existingProfile,
        ...updatedData,
        firstName: updatedData.firstName || existingProfile.FIRST_NAME,
        lastName: updatedData.lastName || existingProfile.LAST_NAME,
        email: updatedData.email || existingProfile.EMAIL,
        phoneNumber: updatedData.phoneNumber || existingProfile.PHONE_NUMBER,
        address: updatedData.address || existingProfile.ADDRESS,
        password: updatedData.password || existingProfile.PASSWORD,
        customerType: updatedData.customerType || existingProfile.CUSTOMER_TYPE,
        dob: updatedData.dob || existingProfile.DATE_OF_BIRTH,
        gender: updatedData.gender || existingProfile.GENDER,
        abn: updatedData.abn || existingProfile.ABN,
        dietaryPreference:
          updatedData.dietaryPreference || existingProfile.DIETARY_PREFERENCE,
        loyaltyPoints:
          updatedData.loyaltyPoints !== undefined
            ? updatedData.loyaltyPoints
            : existingProfile.LOYALTY_POINTS,
        favourites: updatedData.favourites || existingProfile.FAVOURITES,
        postcode: updatedData.postcode || existingProfile.POSTCODE,
        state: updatedData.state || existingProfile.STATE,
        city: updatedData.city || existingProfile.CITY,
      };

      const response = await axios.put(
        `${BASE_URL}/customers/update/${customerId}`,
        customerData
      );

      if (response.status === 200) {
        // Fetch the updated customer data
        await dispatch(fetchCustomerById(customerId));
        return response.data;
      } else {
        return rejectWithValue("Failed to update customer");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* Customer Slice */

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    profile: null, // Will store customer details directly
    favouriteFoods: [], // Example additional state
    status: "idle", // Status to track loading state
    error: null, // To handle errors
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.favouriteFoods = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling createCustomer states (if user signs up)
      .addCase(createCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.profile = action.payload.customer || action.payload; // Store customer details directly in profile
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handling signInCustomer states (if user signs in)
      .addCase(signInCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInCustomer.fulfilled, (state, action) => {
        state.profile = action.payload.customer || action.payload; // Store signed-in customer details directly in profile
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(signInCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handling updateCustomer states (if user updates their profile)
      .addCase(updateCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.profile = {
          ...state.profile, // Keep existing profile data
          ...action.payload, // Update only the fields returned from the backend
        };
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCustomerById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.profile = action.payload; // Update profile with fetched data
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = customerSlice.actions;
export default customerSlice.reducer;
