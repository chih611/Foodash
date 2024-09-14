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

// Memoized selector for admin status
export const selectAdminStatus = createSelector(
  [selectAdmin],
  (admin) => admin.status
);
