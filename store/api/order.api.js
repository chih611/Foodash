import axios from "axios";

// Define base URL with dynamic backend port from the environment variable
const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:${BACKEND_PORT}`;

export const fetchOrderListAPI = async () => {
  const response = await axios.get(`${BASE_URL}/order`);
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

export const fetchOrderLisByCustomerNameAPI = async (full_name) => {
  const response = await axios.get(`${BASE_URL}/order/customer/${full_name}`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

