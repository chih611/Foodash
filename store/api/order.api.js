import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";

// Define base URL with dynamic backend port from the environment variable
// const BASE_URL = `https://${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}`;
const BASE_URL = `http://localhost:8080`;
// const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;

export const fetchOrderListAPI = async () => {
  const response = await axios.get(`${BASE_URL}/order`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export const fetchOrderListByTodayAPI = async () => {
  const response = await axios.get(`${BASE_URL}/orders_today`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export const fetchOrderLisByIdAPI = async (orderId) => {
  const response = await axios.get(`${BASE_URL}/order/${orderId}`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export const updateOrderAPI = async (orderId, updatedData) => {
  try {
    // Fetch existing order data from the server
    const existingOrderResponse = await axios.get(
      `${BASE_URL}/order/${orderId}`
    );
    const existingOrderData = existingOrderResponse.data;

    // Merge existing data with updated data, prioritizing updated data
    const orderData = {
      ORDER_ID: orderId, // Ensure the ID is correctly passed
      CUSTOMER_ID: updatedData.CUSTOMER_ID || existingOrderData.CUSTOMER_ID,
      DUEDATE: updatedData.DUEDATE || existingOrderData.DUEDATE,
      RECIPIENT: updatedData.RECIPIENT || existingOrderData.RECIPIENT,
      ADDRESS: updatedData.ADDRESS || existingOrderData.ADDRESS,
      PHONE: updatedData.PHONE || existingOrderData.PHONE,
      EMAIL: updatedData.EMAIL || existingOrderData.EMAIL,
      DELIVER:
        updatedData.DELIVER !== undefined
          ? updatedData.DELIVER
          : existingOrderData.DELIVER,
      PAYMENT: updatedData.PAYMENT || existingOrderData.PAYMENT,
      TAXES:
        updatedData.TAXES !== undefined
          ? updatedData.TAXES
          : existingOrderData.TAXES,
      DELIVERY_FEE:
        updatedData.DELIVERY_FEE !== undefined
          ? updatedData.DELIVERY_FEE
          : existingOrderData.DELIVERY_FEE,
      SERVICE_FEE:
        updatedData.SERVICE_FEE !== undefined
          ? updatedData.SERVICE_FEE
          : existingOrderData.SERVICE_FEE,
      UTENSIL:
        updatedData.UTENSIL !== undefined
          ? updatedData.UTENSIL
          : existingOrderData.UTENSIL,
      GIFTWRAP:
        updatedData.GIFTWRAP !== undefined
          ? updatedData.GIFTWRAP
          : existingOrderData.GIFTWRAP,
      PROMO:
        updatedData.PROMO !== undefined
          ? updatedData.PROMO
          : existingOrderData.PROMO,
      SUBTOTAL:
        updatedData.SUBTOTAL !== undefined
          ? updatedData.SUBTOTAL
          : existingOrderData.SUBTOTAL,
      ORDER_ITEM_ID:
        updatedData.ORDER_ITEM_ID || existingOrderData.ORDER_ITEM_ID,
      CREATED_DATE: updatedData.CREATED_DATE || existingOrderData.CREATED_DATE,
      TOTAL:
        updatedData.TOTAL !== undefined
          ? updatedData.TOTAL
          : existingOrderData.TOTAL,
      NOTES: updatedData.NOTES || existingOrderData.NOTES,
      STATUS: updatedData.STATUS || existingOrderData.STATUS,
      RECURRING:
        updatedData.RECURRING !== undefined
          ? updatedData.RECURRING
          : existingOrderData.RECURRING,
      UPDATED: new Date(), // Set the update timestamp
      FEEDBACK: updatedData.FEEDBACK || existingOrderData.FEEDBACK, // Replace if feedback is provided
    };

    // Make the PUT request to update the order
    const response = await axios.put(
      `${BASE_URL}/order/update_details/${orderId}`,
      orderData
    );

    return response.data;
  } catch (error) {
    console.error("Error in updateOrder:", error); // Debugging information
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateOrderViewByIdAPI = async (orderId, updatedData) => {
  try {
    // Fetch existing order data from the server
    const existingOrderResponse = await axios.get(
      `${BASE_URL}/order/${orderId}`
    );
    const existingOrderData = existingOrderResponse.data;

    // Merge existing data with updated data, prioritizing updated data
    const orderData = {
      // Ensure the ID is correctly passed
      ID: orderId,
      DUEDATE: updatedData.Duedate || existingOrderData.Duedate,
      RECIPIENT: updatedData.Recipient || existingOrderData.Recipient,
      ADDRESS: updatedData.Address || existingOrderData.Address,
      PHONE: updatedData.Phone || existingOrderData.Phone,
      EMAIL: updatedData.Email || existingOrderData.Email,
      DELIVER:
        updatedData.Deliver !== undefined
          ? updatedData.Deliver
          : existingOrderData.Deliver,
      PAYMENT: updatedData.Payment || existingOrderData.Payment,
      TAXES:
        updatedData.Taxes !== undefined
          ? updatedData.Taxes
          : existingOrderData.Taxes,
      DELIVERY_FEE:
        updatedData["Delivery Fee"] !== undefined
          ? updatedData["Delivery Fee"]
          : existingOrderData["Delivery Fee"],
      SERVICE_FEE:
        updatedData["Service Fee"] !== undefined
          ? updatedData["Service Fee"]
          : existingOrderData["Service Fee"],
      UTENSIL:
        updatedData.UTENSIL !== undefined
          ? updatedData.UTENSIL
          : existingOrderData.UTENSIL,
      GIFTWRAP:
        updatedData.Giftwrap !== undefined
          ? updatedData.Giftwrap
          : existingOrderData.Giftwrap,
      PROMOTION:
        updatedData.Promotion !== undefined
          ? updatedData.Promotion
          : existingOrderData.Promotion,
      SUBTOTAL:
        updatedData.Subtotal !== undefined
          ? updatedData.Subtotal
          : existingOrderData.Subtotal,
      CREATE_DATE:
        updatedData["Create Date"] || existingOrderData["Create Date"],
      TOTAL:
        updatedData.Total !== undefined
          ? updatedData.Total
          : existingOrderData.Total,
      STATUS: updatedData.Status || existingOrderData.Status,
    };

    // Make the PUT request to update the order view
    const response = await axios.put(
      `${BASE_URL}/order/update_view/${orderId}`,
      orderData
    );

    return response.data;
  } catch (error) {
    console.error("Error in updateOrderViewByIdAPI:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const fetchOrderByCustomerIdAPI = async (customerId) => {
  const response = await axios.get(`${BASE_URL}/order/customer/${customerId}`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export const fetchOrderListByCustomerIdAPI = async (customerId) => {
  const response = await axios.get(`${BASE_URL}/order/customer/${customerId}`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export const fetchOrderLisByCustomerNameAPI = async (full_name) => {
  const response = await axios.get(`${BASE_URL}/order/customer/${full_name}`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};
