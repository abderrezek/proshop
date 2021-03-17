import { Router } from "express";

import { authJWT } from "../services/auth";

const routes = new Router();

routes.get("/paypal", authJWT, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

export default routes;
