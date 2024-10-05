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

// Function to check if a cart exists for the customer
const checkCartExists = async (customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/customer/${customerId}`);
    return response.data;
  } catch (error) {
    return null; // Return null if no cart found
  }
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
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ customerId, item }, { getState, rejectWithValue }) => {
    try {
      const { cartItems, cartId } = getState().cart;

      // Debugging logs
      console.log("Current cartId:", cartId);
      console.log("Customer ID:", customerId);
      console.log("Item to add:", item);

      // Handle the case for guest users (customerId is null)
      if (!customerId) {
        const updatedCartItems = [...cartItems, item].filter(
          (item) => item !== null
        ); // Ensure no null items
        return { cartItems: updatedCartItems, cartId: null };
      }

      // If cart already exists for this customer
      if (cartId) {
        const updatedCartItems = [...cartItems, item];
        const cartTotal = updatedCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const result = await updateExistingCart(
          cartId,
          customerId,
          updatedCartItems,
          cartTotal
        );
        console.log("Cart updated successfully:", result); // Debugging log
        return { cartItems: updatedCartItems, cartId };
      }

      // Create a new cart if none exists
      const newCartItems = [item];
      const cartTotal = item.price * item.quantity;
      const newCart = await createNewCart(customerId, newCartItems, cartTotal);
      console.log("New cart created:", newCart); // Debugging log
      return { cartItems: newCartItems, cartId: newCart.CART_ID };
    } catch (error) {
      console.error("Error in addToCart:", error.message); // Debugging log
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (
    { customerId, itemId, extras = {}, note = "" },
    { getState, rejectWithValue }
  ) => {
    try {
      const { cartItems, cartId } = getState().cart;

      // Map through cart items and increase the quantity of the specified item, considering extras and notes
      const updatedCartItems = cartItems.map((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) ===
          JSON.stringify(extras || {});
        const notesMatch = (cartItem.note || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        // Increase the quantity only for the matching item
        if (extrasMatch && notesMatch && itemIdMatch) {
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
        console.log("Cart updated successfully:", result); // Debugging log
        return { cartItems: updatedCartItems, cartId };
      }
    } catch (error) {
      console.error("Error in increaseQuantity:", error.message); // Debugging log
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { customerId, itemId, extras = {}, note = "" },
    { getState, rejectWithValue }
  ) => {
    try {
      const { cartItems, cartId } = getState().cart;

      // Log the state of cartItems before the removal process
      console.log("Current cart items before removal:", cartItems);
      console.log("Attempting to remove item:", { itemId, extras, note });

      // Improved comparison logic for extras and note
      const updatedCartItems = cartItems.filter((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) ===
          JSON.stringify(extras || {});
        const notesMatch = (cartItem.note || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        return !(extrasMatch && notesMatch && itemIdMatch);
      });

      // Log the updated cart after removal attempt
      console.log("Updated cart items after removal:", updatedCartItems);

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
        console.log("Cart updated successfully:", result);
        return { cartItems: updatedCartItems, cartId };
      }
    } catch (error) {
      console.error("Error in removeFromCart:", error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (
    { customerId, itemId, extras = {}, note = "" },
    { getState, rejectWithValue, dispatch }
  ) => {
    try {
      const { cartItems, cartId } = getState().cart;

      // Find the target item
      const targetItem = cartItems.find((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) ===
          JSON.stringify(extras || {});
        const notesMatch = (cartItem.note || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        return extrasMatch && notesMatch && itemIdMatch;
      });

      // If the item exists and its quantity is 1, remove it instead of decreasing
      if (targetItem && targetItem.quantity === 1) {
        return dispatch(
          removeFromCart({ customerId, itemId, extras, note })
        ).unwrap();
      }

      // Otherwise, proceed to decrease the quantity
      const updatedCartItems = cartItems.map((cartItem) => {
        const extrasMatch =
          JSON.stringify(cartItem.extras || {}) ===
          JSON.stringify(extras || {});
        const notesMatch = (cartItem.note || "").trim() === (note || "").trim();
        const itemIdMatch = cartItem.itemId === itemId;

        if (extrasMatch && notesMatch && itemIdMatch) {
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

      // If a cartId exists, update the cart in the backend
      if (cartId) {
        const result = await updateExistingCart(
          cartId,
          customerId,
          updatedCartItems,
          cartTotal
        );
        console.log("Cart updated successfully:", result); // Debugging log
        return { cartItems: updatedCartItems, cartId };
      }

      // Handle cases where there's no cartId
      return { cartItems: updatedCartItems, cartId: null };
    } catch (error) {
      console.error("Error in decreaseQuantity:", error.message); // Debugging log
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const clearCartItems = createAsyncThunk(
  "cart/clearCartItems",
  async ({ customerId, cartId }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState();

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

      console.log("Cart cleared successfully:", result.data);
      return { cartItems: updatedCartItems, cartId };
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getCartTotal = (state) => {
  if (!state.cart.cartItems || state.cart.cartItems.length === 0) {
    return 0;
  }
  return state.cart.cartItems
    .filter((item) => item !== null)
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
};

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
