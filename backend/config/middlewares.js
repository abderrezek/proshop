import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";

import { config } from "../constants";

export default (app) => {
  if (config.is_PROD) {
    app.use(compression());
  }

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  if (config.is_DEV) {
    app.use(morgan("dev"));
    app.use(cors());
  }
};
