import jwt from "jsonwebtoken";

import { config } from "../constants";

export const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};
