import { Router } from "express";

import ProductRoutes from "./products";

const routes = new Router();

routes.use("/products", ProductRoutes);

export default routes;
