import axiosCaller from "./apiUtils";

const ORDERS = "orders";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createOrder = (order, token) => {
  config.headers.Authorization = `Bearer ${token}`;
  return axiosCaller.post(`${ORDERS}/`, order, config);
};

export const getOrderById = (id, token) => {
  config.headers.Authorization = `Bearer ${token}`;
  return axiosCaller.get(`${ORDERS}/${id}`, config);
};
