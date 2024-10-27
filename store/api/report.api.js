import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_ADDRESS;

export const fetchCurrentMonthCateSalesAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/current_cate_sales`);
    let data = response.data;
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchSalesByMonthAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sales_by_month`);
    let data = response.data;
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchSaleReportsAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sales_reports`);
    let data = response.data;
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchSaleSumByMonthAPI = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/sales_by_month/${month}`);
    let data = response.data;
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchSaleMethodThisMonthAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/report_method`);
    let data = response.data;
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};
