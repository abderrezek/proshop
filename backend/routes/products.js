import { Router } from "express";

import * as productController from "../controllers/products";

const routes = new Router();

routes.get("/", productController.getProducts);
routes.get("/:id", productController.getProductById);

export default routes;
