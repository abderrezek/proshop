import { Router } from "express";
import { validate } from "express-validation";

import * as userController from "../controllers/user";
import { userValidation } from "../utils/validations";
import { authJWT, admin } from "../services/auth";

const routes = new Router();

routes.post("/login", validate(userValidation.login), userController.login);

routes
  .route("/profile")
  .get(authJWT, userController.profile)
  .put(
    authJWT,
    validate(userValidation.updateProfile),
    userController.updateProfile
  );

routes
  .route("/")
  .post(validate(userValidation.register), userController.register)
  .get(authJWT, admin, userController.getUsers);

routes
  .route("/:id")
  .delete(authJWT, admin, userController.deleteUser)
  .get(authJWT, admin, userController.getUserById)
  .put(authJWT, admin, userController.updateUser);

export default routes;
