import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const getCartTotal = (state) => {
  if (state.cart.cartItems.length === 0) {
    return 0;
  }
  return state.cart.cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      console.log("Added to cart:", action.payload);
      console.log("Cart items:", JSON.parse(JSON.stringify(state.cartItems)));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.ITEM_ID !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
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
