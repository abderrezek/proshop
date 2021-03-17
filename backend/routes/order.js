import { Router } from "express";
import { validate } from "express-validation";

import * as orderController from "../controllers/order";
import { orderValidation } from "../utils/validations";
import { authJWT } from "../services/auth";

const routes = new Router();

routes.post(
  "/",
  authJWT,
  validate(orderValidation.add),
  orderController.addOrderItems
);

routes.get("/myorders", authJWT, orderController.getMyOrders);

routes.get("/:id", authJWT, orderController.getOrderById);

routes.put("/:id/pay", authJWT, orderController.updateOrderToPaid);

export default routes;
