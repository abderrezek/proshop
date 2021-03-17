import axiosCaller from "./apiUtils";

export const getClientIdPayPal = (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosCaller.get("/config/paypal", config);
};
