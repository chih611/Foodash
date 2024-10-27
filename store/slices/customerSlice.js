import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = `https://${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}`;
const BASE_URL = `http://localhost:8080`;
// const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;

export const getAllCustomers = createAsyncThunk(
  "customer/getAllCustomers",
  async () => {
    const response = await axios.get(`${BASE_URL}/customer`);
    return response.data;
  }
);

// Check if the customer already exists
export const checkIfCustomerExists = async (type, email, phoneNumber) => {
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

// Function to upgrade an existing guest to a user
// Function to upgrade an existing guest to a user
export const upgradeGuestToUser = async (customerId, updatedData) => {
  console.log("Upgrading guest to user:", customerId, updatedData);

  // Fetch existing customer data
  const existingCustomerResponse = await axios.get(
    `${BASE_URL}/customer/${customerId}`
  );
  const existingCustomerData = existingCustomerResponse.data;

  // Merge existing data with updated data, prioritizing updated data
  const customerData = {
    id: customerId, // Ensure the ID is correctly passed
    firstName: updatedData.firstName || existingCustomerData.FIRST_NAME,
    lastName: updatedData.lastName || existingCustomerData.LAST_NAME,
    email: updatedData.email || existingCustomerData.EMAIL,
    password: updatedData.password || existingCustomerData.PASSWORD,
    phoneNumber: updatedData.phone || existingCustomerData.PHONE_NUMBER,
    address: updatedData.address || existingCustomerData.ADDRESS,
    dob: updatedData.dateOfBirth || existingCustomerData.DATE_OF_BIRTH,
    gender: updatedData.gender || existingCustomerData.GENDER,
    customerType: "user", // Set to 'user' to upgrade the type
    companyName: updatedData.companyName || existingCustomerData.COMPANY_NAME,
    abn: updatedData.abn || existingCustomerData.ABN,
    dietaryPreference:
      updatedData.dietaryPreference || existingCustomerData.DIETARY_PREFERENCE,
    loyaltyPoints:
      updatedData.loyaltyPoints !== undefined
        ? updatedData.loyaltyPoints
        : existingCustomerData.LOYALTY_POINTS,
    favourites:
      updatedData.favourites || JSON.stringify(existingCustomerData.FAVOURITES),
    postcode: updatedData.postcode || existingCustomerData.POSTCODE,
    state: updatedData.state || existingCustomerData.STATE,
    city: updatedData.city || existingCustomerData.CITY,
  };

  const response = await axios.put(
    `${BASE_URL}/customers/update/${customerId}`,
    customerData
  );
  return response.data;
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
        console.log("Existing customer:", existingCustomer.data);
        // If guest and now signing up as a user, upgrade them
        if (
          existingCustomer.data.CUSTOMER_TYPE === "guest" &&
          type === "user"
        ) {
          // Call the function to upgrade the guest to a user
          const updatedCustomer = await upgradeGuestToUser(
            existingCustomer.data.CUSTOMER_ID, // Pass the existing customer ID
            customerData // Use the new form data for the update
          );
          return updatedCustomer; // Return the updated customer data
        } else {
          // If the existing customer is already a user, return an error
          return rejectWithValue("Customer already exists as a user.");
        }
      }

      // If no existing customer is found, create a new customer
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
        DATE_OF_BIRTH: updatedData.dateOfBirth || existingProfile.DATE_OF_BIRTH, // Ensure DATE_OF_BIRTH is used
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
    allCustomers: [], // To store all customers
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
      // Handling createCustomer states (if user signs up)up
      .addCase(getAllCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.allCustomers = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
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
