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
    console.log('API URL:', `${BASE_URL}/item/create`);
    console.log('Sending data:', productData);
    
    // Use query parameters since backend uses req.query
    const response = await axios.post(`${BASE_URL}/item/create`, null, {
      params: {  
        name: productData.name,
        quantity: parseInt(productData.quantity) || 0,
        price: parseFloat(productData.price) || 0,
        category_id: parseInt(productData.category_id) || null,
        description: productData.description || '',
        special: parseInt(productData.special) || 0
      }
    });
    
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

// export const createItemAPI = async (productData) => {
//   try {
//     console.log('API URL:', `${BASE_URL}/item/create`); // Changed from /item to /items if that's your backend route
//     console.log('Sending data:', productData);
//     const response = await axios.post(`${BASE_URL}/item/create`, {
//       name: productData.name,
//       quantity: parseInt(productData.quantity) || 0,
//       price: parseFloat(productData.price) || 0,
//       category_id: parseInt(productData.category_id) || null,
//       description: productData.description || '',
//       special: parseInt(productData.special) || ''
//     });
//     console.log('Sending data:', response);
//     return response.data;
    
//   } catch (error) {
//     console.error('API Error:', error.response?.data || error.message);
//     throw error;
//   }
// };
