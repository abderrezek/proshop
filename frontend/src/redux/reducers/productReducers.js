import { productActionsTypes } from "../actions/actionsTypes";
import { productState } from "./initialeState";

export const productListReducer = (
  state = productState.listProduct,
  action
) => {
  switch (action.type) {
    case productActionsTypes.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case productActionsTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case productActionsTypes.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = productState.detailsProduct,
  action
) => {
  switch (action.type) {
    case productActionsTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case productActionsTypes.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case productActionsTypes.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = productState.deleteProduct,
  action
) => {
  switch (action.type) {
    case productActionsTypes.PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case productActionsTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case productActionsTypes.PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case productActionsTypes.PRODUCT_DELETE_RESET:
      return productState.deleteProduct;
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = productState.createProduct,
  action
) => {
  switch (action.type) {
    case productActionsTypes.PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case productActionsTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case productActionsTypes.PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case productActionsTypes.PRODUCT_CREATE_RESET:
      return productState.createProduct;
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = productState.updateProduct,
  action
) => {
  switch (action.type) {
    case productActionsTypes.PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case productActionsTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case productActionsTypes.PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case productActionsTypes.PRODUCT_UPDATE_RESET:
      return { ...state, product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (
  state = productState.reviewProduct,
  action
) => {
  switch (action.type) {
    case productActionsTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case productActionsTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true };
    case productActionsTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case productActionsTypes.PRODUCT_CREATE_REVIEW_RESET:
      return { ...state };
    default:
      return state;
  }
};

export const productTopRatedReducer = (
  state = productState.ratedProduct,
  action
) => {
  switch (action.type) {
    case productActionsTypes.PRODUCT_TOP_REQUEST:
      return { ...state, loading: true, products: [] };
    case productActionsTypes.PRODUCT_TOP_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case productActionsTypes.PRODUCT_TOP_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
