import { Router } from "express";

import * as productController from "../controllers/products";
import { authJWT, admin } from "../services/auth";

const routes = new Router();

routes
  .route("/")
  .get(productController.getProducts)
  .post(authJWT, admin, productController.createProduct);

routes
  .route("/:id")
  .get(productController.getProductById)
  .delete(authJWT, admin, productController.deleteProduct)
  .put(authJWT, admin, productController.updateProduct);

export default routes;
