import { config } from "../constants";

export default (app) => {
  app.use((req, res, next) => {
    let error = new Error(`Not Found - ${req.originalUrl}`);

    res.status(404);

    if (config.is_DEV) {
      next(error);
    } else {
      res.status(404).json({ message: "Page Not Found" });
    }
  });
};
