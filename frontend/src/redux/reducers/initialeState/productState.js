export const listProduct = {
  loading: false,
  products: [],
  pages: 0,
  page: 0,
  error: null,
};

export const detailsProduct = {
  loading: false,
  product: { reviews: [] },
  error: null,
};

export const deleteProduct = {
  loading: false,
  success: false,
  message: "",
  error: null,
};

export const createProduct = {
  loading: false,
  success: false,
  error: null,
  product: {},
};

export const updateProduct = {
  loading: false,
  success: false,
  error: null,
  product: {},
};

export const reviewProduct = {
  loading: false,
  success: false,
  error: null,
};

export const ratedProduct = {
  loading: false,
  products: [],
  error: null,
};
