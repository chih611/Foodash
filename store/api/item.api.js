import axios from "axios";

// Define base URL with dynamic backend port from the environment variable
const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;

export const fetchItemListAPI = async () => {
  const response = await axios.get(`${BASE_URL}/item`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};
