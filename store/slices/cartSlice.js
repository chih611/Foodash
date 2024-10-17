import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:${BACKEND_PORT}`;

/* Helper Functions */

// Function to create a new cart
const createNewCart = async (customerId, cartItems, cartTotal) => {
  const response = await axios.post(`${BASE_URL}/cart/create`, {
    customerId,
    cartItems,
    cartTotal,
  });
  return response.data;
};

// Function to update an existing cart
const updateExistingCart = async (cartId, customerId, cartItems, cartTotal) => {
  const response = await axios.put(`${BASE_URL}/cart/update/${cartId}`, {
    customerId,
    cartItems,
    cartTotal,
  });
  return response.data;
};

/* Async Thunks */

// Fetch cart by customer ID
export const fetchCartByCustomerId = createAsyncThunk(
  "cart/fetchCartByCustomerId",
  async (customerId, { rejectWithValue }) => {
    try {
      if (!customerId) {
        return { CART_ITEMS: [], CART_ID: null };
      }

      const response = await axios.get(
        `${BASE_URL}/cart/customer/${customerId}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch cart");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to add an item to the cart
// Thunk to add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ customerId, item }, { getState, rejectWithValue }) => {
    try {
      const { cartItems, cartId } = getState().cart;

      console.log("addToCart triggered for customerId:", customerId);

      // Handle guest users (customerId is null)
      if (!customerId) {
        console.log("Handling as guest user");
        const updatedCartItems = [...cartItems, item].filter(
          (item) => item !== null
        );
        return { cartItems: updatedCartItems, cartId: null };
      }

      // Log cart items and check for existing item
      console.log("Handling logged-in user, cartId:", cartId);
      const existingItem = cartItems.find(
        (cartItem) =>
          cartItem.itemId === item.itemId &&
          JSON.stringify(cartItem.extras) === JSON.stringify(item.extras) &&
          JSON.stringify(cartItem.labels) === JSON.stringify(item.labels) &&
          (cartItem.notes || "").trim() === (item.notes || "").trim()
      );

      let updatedCartItems;
      if (existingItem) {
        // Create a new array, don't modify original state
        updatedCartItems = cartItems.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Append new item immutably
        updatedCartItems = [...cartItems, item];
      }

      const cartTotal = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      if (cartId) {
        console.log("Updating existing cart for cartId:", cartId);
        const result = await updateExistingCart(
          cartId,
          customerId,
          updatedCartItems,
          cartTotal
        );
        return { cartItems: updatedCartItems, cartId };
      }

      console.log("Creating a new cart for customerId:", customerId);
      const newCart = await createNewCart(
        customerId,
        updatedCartItems,
        cartTotal
      );
      return { cartItems: updatedCartItems, cartId: newCart.CART_ID };
    } catch (error) {
      console.error("Error in addToCart:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Increase item quantity
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (
    { customerId, itemId, extras = {}, labels = {}, note = "" },
    { getState, rejectWithValue }
  ) => {
    try {
      const { cartItems, cartId } = getState().cart;

      // Increase the quantity of the specified item, considering extras, notes, and labels
      const updatedCartItems = cartItems.map((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) === JSON.stringify(extras);
        const labelsMatch =
          JSON.stringify(cartItem.labels || {}) === JSON.stringify(labels);
        const notesMatch =
          (cartItem.notes || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        if (itemIdMatch && extrasMatch && labelsMatch && notesMatch) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      const cartTotal = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      if (!customerId) {
        return { cartItems: updatedCartItems, cartId: null };
      }

      if (cartId) {
        const result = await updateExistingCart(
          cartId,
          customerId,
          updatedCartItems,
          cartTotal
        );
        return { cartItems: updatedCartItems, cartId };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { customerId, itemId, extras = {}, labels = {}, note = "" },
    { getState, rejectWithValue }
  ) => {
    try {
      const { cartItems, cartId } = getState().cart;

      const updatedCartItems = cartItems.filter((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) === JSON.stringify(extras);
        const labelsMatch =
          JSON.stringify(cartItem.labels || {}) === JSON.stringify(labels);
        const notesMatch =
          (cartItem.notes || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        return !(extrasMatch && labelsMatch && notesMatch && itemIdMatch);
      });

      const cartTotal = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      if (!customerId) {
        return { cartItems: updatedCartItems, cartId: null };
      }

      if (cartId) {
        const result = await updateExistingCart(
          cartId,
          customerId,
          updatedCartItems,
          cartTotal
        );
        return { cartItems: updatedCartItems, cartId };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Decrease item quantity
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (
    { customerId, itemId, extras = {}, labels = {}, note = "" },
    { getState, rejectWithValue, dispatch }
  ) => {
    try {
      const { cartItems, cartId } = getState().cart;

      const targetItem = cartItems.find((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) === JSON.stringify(extras);
        const labelsMatch =
          JSON.stringify(cartItem.labels || {}) === JSON.stringify(labels);
        const notesMatch =
          (cartItem.notes || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        return extrasMatch && labelsMatch && notesMatch && itemIdMatch;
      });

      if (targetItem && targetItem.quantity === 1) {
        return dispatch(
          removeFromCart({ customerId, itemId, extras, labels, note })
        ).unwrap();
      }

      const updatedCartItems = cartItems.map((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) === JSON.stringify(extras);
        const labelsMatch =
          JSON.stringify(cartItem.labels || {}) === JSON.stringify(labels);
        const notesMatch =
          (cartItem.notes || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        if (extrasMatch && labelsMatch && notesMatch && itemIdMatch) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });

      const cartTotal = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      if (!customerId) {
        return { cartItems: updatedCartItems, cartId: null };
      }

      if (cartId) {
        const result = await updateExistingCart(
          cartId,
          customerId,
          updatedCartItems,
          cartTotal
        );
        return { cartItems: updatedCartItems, cartId };
      }

      return { cartItems: updatedCartItems, cartId: null };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Clear cart items
export const clearCartItems = createAsyncThunk(
  "cart/clearCartItems",
  async ({ customerId, cartId }, { getState, rejectWithValue }) => {
    try {
      const updatedCartItems = [];
      const cartTotal = 0;

      if (!customerId) {
        return { cartItems: updatedCartItems, cartId: null };
      }

      const result = await updateExistingCart(
        cartId,
        customerId,
        updatedCartItems,
        cartTotal
      );
      return { cartItems: updatedCartItems, cartId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Selector to get the total cart value
export const getCartTotal = (state) => {
  if (!state.cart.cartItems || state.cart.cartItems.length === 0) {
    return 0;
  }
  return state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Slice definition
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.cartId = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByCustomerId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByCustomerId.fulfilled, (state, action) => {
        state.cartItems = action.payload.CART_ITEMS || [];
        state.cartId = action.payload.CART_ID || null;
        state.status = "succeeded";
      })
      .addCase(fetchCartByCustomerId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.cartId = action.payload.cartId;
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(increaseQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.cartId = action.payload.cartId;
        state.status = "succeeded";
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.cartId = action.payload.cartId;
        state.status = "succeeded";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(decreaseQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.cartId = action.payload.cartId;
        state.status = "succeeded";
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(clearCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.cartId = action.payload.cartId;
        state.status = "succeeded";
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
