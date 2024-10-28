import axios from "axios";

// Define base URL with dynamic backend port from the environment variable
const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;

const fetchItemListAPI = async () => {
  const response = await axios.get(`${BASE_URL}/item`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

const createItemAPI = async (productData) => {
  try {
    // Use query parameters since backend uses req.query
    const response = await axios.post(`${BASE_URL}/item/create`, null, {
      params: {
        name: productData.name,
        quantity: parseInt(productData.quantity) || 0,
        price: parseFloat(productData.price) || 0,
        category_id: parseInt(productData.category_id) || null,
        description: productData.description || "",
        special: parseInt(productData.special) || 0,
      },
    });

    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

const fetchAdminItemByDetailIdAPI = async (item_id) => {
  const response = await axios.get(`${BASE_URL}/items_admin/detail/${item_id}`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

const fetchAdminItemsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/items_admin`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

const fetchModificationsAPI = async (item_id) => {
  const response = await axios.get(
    `${BASE_URL}/items_admin/modification/${item_id}`
  );
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export {
  fetchItemListAPI,
  createItemAPI,
  fetchAdminItemByDetailIdAPI,
  fetchAdminItemsAPI,
  fetchModificationsAPI,
};