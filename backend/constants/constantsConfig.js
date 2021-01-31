import "dotenv/config";

const defaultConfig = {
  MODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 5000,

  // MONGO_URI: process.env.MONGO_URI,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbCluster: process.env.DB_CLUSTER,
};

const devConfig = {
  MONGO_URI: `mongodb+srv://${defaultConfig.dbUsername}:${defaultConfig.dbPassword}@${defaultConfig.dbCluster}/${defaultConfig.dbName}?retryWrites=true&w=majority`,
};

const testConfig = {};

const prodConfig = {
  MONGO_URI: `mongodb+srv://${defaultConfig.dbUsername}:${defaultConfig.dbPassword}@${defaultConfig.dbCluster}/${defaultConfig.dbName}?retryWrites=true&w=majority`,
};

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

const modeEnv = {
  is_DEV: defaultConfig.MODE_ENV === "development",
  is_PROD: defaultConfig.MODE_ENV !== "development",
  is_TEST: defaultConfig.MODE_ENV === "test",
};

export default {
  ...defaultConfig,
  ...envConfig(defaultConfig.MODE_ENV),
  ...modeEnv,
};
