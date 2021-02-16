import { ValidationError } from "express-validation";

import { config } from "../constants";

export default (app) => {
  app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  });

  app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      stack: config.is_DEV ? err.stack : null,
    });
  });
};
