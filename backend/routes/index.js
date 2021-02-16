import { Router } from "express";

import ProductRoutes from "./products";
import UserRoutes from "./user";

const routes = new Router();

// @route   /api/v1/products
routes.use("/products", ProductRoutes);
// @route   /api/v1/users
routes.use("/users", UserRoutes);

export default routes;
