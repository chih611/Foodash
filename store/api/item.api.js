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

export const createItemAPI = async (productData) => {
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

export const createModificationAPI = async (productData) => {
  try {
    // Use query parameters since backend uses req.query 
    // itemId, modification, ingredients, labelId
    const response = await axios.post(`${BASE_URL}/item/create/modification`, null, {
      params: {
        itemId: parseInt(productData.itemId),
        modification: productData.modification || "",
        ingredients: productData.ingredients || {},
        labelId: parseInt(productData.labelId) || null,
      },
    });

    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchAdminItemByDetailIdAPI = async (item_id) => {
  const response = await axios.get(`${BASE_URL}/items_admin/detail/${item_id}`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export const fetchAdminItemsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/items_admin`);
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};

export const fetchModificationsAPI = async (item_id) => {
  const response = await axios.get(
    `${BASE_URL}/items_admin/modification/${item_id}`
  );
  let data = response.data;
  if (!Array.isArray(data)) {
    data = [data];
  }
  return data;
};