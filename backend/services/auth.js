import asyncHandler from "express-async-handler";

import User from "../models/user";
import { verifyToken } from "../utils/token";

export const authJWT = asyncHandler(async (req, res, next) => {
  let authorization = req.headers.authorization;
  let token;

  res.setHeader("Content-Type", "text/json");

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { id } = verifyToken(token);

      req.user = await User.findById(id).select("-password");
    } catch (err) {
      console.error(err);
      res.status(401);
      return res.json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401);
    return res.json({ message: "Not authorized, no token" });
  }

  next();
});
