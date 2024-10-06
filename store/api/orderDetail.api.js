import axios from "axios";

const BACKEND_PORT = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT;
const BASE_URL = `http://localhost:${BACKEND_PORT}`;

export const fetchOrderDetailListAPI = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/order_details/${orderId}`);
    let data = response.data;
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};
