import axios from "axios";

// const BASE_URL = `https://${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS}`;
const BASE_URL = `http://localhost:8080`;

export const fetchOrderDetailListAPI = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/order_details/${orderId}`);
    let data = response.data;
    console.log("Order Details:", orderId, data);

    return data;
  } catch (e) {
    console.log(e);
  }
};
