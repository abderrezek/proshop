import "dotenv/config";

const defaultConfig = {
  MODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 5000,
};

const devConfig = {};

const testConfig = {};

const prodConfig = {};

const envConfig = (env) => {
  switch (env) {
    case "development":
      return devConfig;

    case "test":
      return testConfig;

    default:
      return prodConfig;
  }
};

export default {
  ...defaultConfig,
  ...envConfig(defaultConfig.MODE_ENV),
};
