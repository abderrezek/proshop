import express from "express";
import colors from "colors";

import { config } from "./constants";
import dbConfig from "./config/db";
import middlewareConfig from "./config/middlewares";
import APIRoutes from "./routes";
import notFound from "./config/404";
import errorHandling from "./config/errorHandling";

const app = express();

/**
 * Middlewares Configuration
 */
middlewareConfig(app);

/**
 * Database Configuration
 */
dbConfig();

/**
 * Routes Configuration
 */
app.get("/", (req, res) => {
  res.send("API Running...");
});
app.use("/api/v1", APIRoutes);

/**
 * Route NotFound
 */
notFound(app);

/**
 * Errors Handling
 */
errorHandling(app);

/**
 * App Listening
 */
app.listen(config.PORT, (err) => {
  if (err) {
    console.log("Cannot Running");
    console.log("==============================");
    console.log(err);
    console.log("==============================");
  } else {
    console.log(
      `
      -----
      Server Running on PORT: ${config.PORT}
      -----
      On mode envirenmont: ${config.MODE_ENV}
      -----
    `.cyan.bold
    );
  }
});
