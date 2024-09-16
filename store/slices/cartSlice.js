import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch cart data for the customer
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.example.com/cart/${customerId}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], // Renamed from items to cartItems
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); // Add the modified item to the cartItems array
      console.log("Added to cart:", action.payload);
      console.log("Cart items:", JSON.parse(JSON.stringify(state.cartItems))); // Deep clone to properly log items
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.ITEM_ID !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = []; // Clear cartItems instead of items
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Updated to set fetched cartItems
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
