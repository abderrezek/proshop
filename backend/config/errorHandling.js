import { config } from "../constants";

export default (app) => {
  app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      stack: config.is_DEV ? err.stack : null,
    });
  });
};
