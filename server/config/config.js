const Joi = require('joi');

require('../validators/config.validator');
const env = process.env;
const config = {
  env: env.NODE_ENV,
  port: env.SERVER_PORT,
  jwt: { secret: env.JWT_SECRET, algo: env.JWT_ALGO },
  mongo: {
    host: env.MONGO_HOST,
    port: env.MONGO_PORT,
    userName: env.MONGO_USER,
    password: env.MONGO_PASSWORD,
    dbName: env.MONGO_DBNAME,
    mongooseDebug: env.MONGOOSE_DEBUG
  },
  email: {
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    service: env.EMAIL_SERVICE,
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
    debug: env.EMAIL_DEBUG,
    logger: env.EMAIL_LOGGER
  }
};
module.exports = config;
