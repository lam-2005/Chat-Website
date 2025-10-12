import "dotenv/config";

const env = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV,
};
export default env;
