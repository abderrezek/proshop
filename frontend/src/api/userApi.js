import axiosCaller from "./apiUtils";

const USERS = "users";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = (email, password) => {
  return axiosCaller.post(
    `${USERS}/login`,
    {
      email,
      password,
    },
    config
  );
};

export const register = (name, email, password) => {
  return axiosCaller.get(`${USERS}/`, { name, email, password }, config);
};
