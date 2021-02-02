import axiosCaller from "./apiUtils";

const PRODUCTS = "products";

export const list = (skip, limit) => {
  return axiosCaller.get(`${PRODUCTS}/?skip=${skip}&limit=${limit}`);
};
