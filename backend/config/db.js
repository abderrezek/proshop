import mongoose from "mongoose";

import { config } from "../constants";

export default () => {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  mongoose.set("useCreateIndex", true);

  try {
    mongoose.connect(config.MONGO_URI);
  } catch (err) {
    mongoose.createConnection(config.MONGO_URI);
  }

  mongoose.connection
    .once("open", () => console.log(`MongoDB Running`.yellow.bold))
    .on("error", (err) => {
      console.error(`Error Connection MongoDB: ${err.message}`.red.bold);
      process.exit(1);
    });
};
