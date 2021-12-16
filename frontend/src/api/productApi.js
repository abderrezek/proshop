import axiosCaller from "./apiUtils";

const PRODUCTS = "products";

export const list = (page, limit) => {
  // return axiosCaller.get(`${PRODUCTS}/?skip=${skip}&limit=${limit}`);
  let skip = (page - 1) * limit;
  return axiosCaller.get(`${PRODUCTS}/?skip=${skip}&limit=${limit}`);
};

export const detail = (id) => {
  return axiosCaller.get(`${PRODUCTS}/${id}`);
};

export const deleteProduct = (id, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosCaller.delete(`${PRODUCTS}/${id}`, config);
};

export const createProduct = (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosCaller.post(`${PRODUCTS}/`, null, config);
};
