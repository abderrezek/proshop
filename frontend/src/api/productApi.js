import axiosCaller from "./apiUtils";

const PRODUCTS = "products";

export const list = (skip, limit) => {
  // return axiosCaller.get(`${PRODUCTS}/?skip=${skip}&limit=${limit}`);
  return axiosCaller.get(`${PRODUCTS}/`);
};

export const detail = (id) => {
  return axiosCaller.get(`${PRODUCTS}/${id}`);
};
