import { Router } from "express";

import ProductRoutes from "./products";
import OrderRoutes from "./order";
import UserRoutes from "./user";

const routes = new Router();

// @route   /api/v1/products
routes.use("/products", ProductRoutes);
// @route   /api/v1/orders
routes.use("/orders", OrderRoutes);
// @route   /api/v1/users
routes.use("/users", UserRoutes);

export default routes;
