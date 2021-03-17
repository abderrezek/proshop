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

export const payOrder = (id, paymentResult, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosCaller.put(`${ORDERS}/${id}/pay`, paymentResult, config);
};

export const myOrders = (page, limit, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let skip = (page - 1) * limit;
  return axiosCaller.get(
    `${ORDERS}/myorders?skip=${skip}&limit=${limit}`,
    config
  );
};
