// src/store/selectors/selectors.js
import { createSelector } from "reselect";

// Select the customer slice from the state
const selectCustomer = (state) => state.customer;

// Memoized selector for customer profile
export const selectCustomerProfile = createSelector(
  [selectCustomer],
  (customer) => customer.profile
);

// Memoized selector for customer status
export const selectCustomerStatus = createSelector(
  [selectCustomer],
  (customer) => customer.status
);

// Memoized selector for customer error
export const selectCustomerError = createSelector(
  [selectCustomer],
  (customer) => customer.error
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

// Select the items slice from the state
const selectItemsState = (state) => state.items;

// Memoized selector for the list of items
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

const selectCategoryState = (state) => state.category;

// Memoized selector for fetching category items (items within a specific category)
export const selectCategoryItems = createSelector(
  [selectCategoryState],
  (categoryState) => categoryState.categoryItems
);

// Memoized selector for the categories list (all available categories)
export const selectAllCategories = createSelector(
  [selectCategoryState],
  (categoryState) => categoryState.categories
);

// Memoized selector for category loading status (for both category items and categories)
export const selectCategoryItemsStatus = createSelector(
  [selectCategoryState],
  (categoryState) => categoryState.status
);

export const selectCategoriesStatus = createSelector(
  [selectCategoryState],
  (categoryState) => categoryState.categoryStatus
);

// Memoized selector for category error (for both category items and categories)
export const selectCategoryItemsError = createSelector(
  [selectCategoryState],
  (categoryState) => categoryState.error
);

export const selectCategoriesError = createSelector(
  [selectCategoryState],
  (categoryState) => categoryState.categoryError
);
