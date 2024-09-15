// src/store/selectors/selectors.js
import { createSelector } from "reselect";

// Select the customer slice from the state
const selectCustomer = (state) => state.customer;

// Memoized selector for customer profile
export const selectCustomerProfile = createSelector(
  [selectCustomer],
  (customer) => customer.profile
);

// Select the cart slice from the state
const selectCart = (state) => state.cart;

// Memoized selector for cart items
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.items
);

// Select the admin slice from the state
const selectAdmin = (state) => state.admin;

// src/store/selectors/selectors.js

// Select the items slice from the state
const selectItemsState = (state) => state.items;

// Memoized selector for the list of items

// Memoized selector for admin profile
export const selectAdminProfile = createSelector(
  [selectAdmin],
  (admin) => admin.profile
);

// Memoized selector for fetching all users managed by admin
export const selectAllUsers = createSelector(
  [selectAdmin],
  (admin) => admin.users
);

export const selectAllItems = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.items
);

// Memoized selector for the items loading status
export const selectItemsStatus = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.status
);

// Memoized selector for items error
export const selectItemsError = createSelector(
  [selectItemsState],
  (itemsState) => itemsState.error
);

// Memoized selector for admin status
export const selectAdminStatus = createSelector(
  [selectAdmin],
  (admin) => admin.status
);
