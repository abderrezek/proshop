import { Router } from "express";
import { validate } from "express-validation";

import * as userController from "../controllers/user";
import { userValidation } from "../utils/validations";
import { authJWT } from "../services/auth";

const routes = new Router();

routes.post("/", validate(userValidation.register), userController.register);
routes.post("/login", validate(userValidation.login), userController.login);
routes.get("/profile", authJWT, userController.profile);
routes.put(
  "/profile",
  authJWT,
  validate(userValidation.updateProfile),
  userController.updateProfile
);

export default routes;
