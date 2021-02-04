import cors from "cors";
import morgan from "morgan";
import compression from "compression";

import { config } from "../constants";

export default (app) => {
  if (config.is_PROD) {
    app.use(compression());
  }

  if (config.is_DEV) {
    app.use(morgan("dev"));
    app.use(cors());
  }
};
