const Joi = require('joi');
const configJSON = require('../../config.json');
const JoiObjectValidator = require('../utils/JoiObjectValidator');

const env = JoiObjectValidator(
  Joi.string()
    .allow('development', 'production', 'test')
    .default('development'),
  configJSON.env
);
// define validation for all the env vars
const configVarsSchema = Joi.object({
  usingWebServer: Joi.boolean().default(false),
  port: Joi.number().default(8080),
  jwtSecret: Joi.string().required().description('JWT Secret required to sign'),
  mongo: Joi.object({
    dbName: Joi.string().required(),
    userName: Joi.string(),
    password: Joi.string(),
    host: Joi.string().description('Mongo DB host url'),
    port: Joi.number().when('host', { then: Joi.number().default(27017) }),
    socketAddresses: Joi.array()
      .items(
        Joi.string()
          .trim()
          .min(1)
          // Regex below is based on Hostname and port number. and may not be covering invalid Ips
          .regex(
            /(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])\:([0-9]+)/
          )
      )
      .unique(),
    mongoURI: Joi.string(),
    mongooseDebug: Joi.boolean().when(env, {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    })
  })
    .required()
    .and('userName', 'password')
    .xor('host', 'socketAddresses.0', 'mongoURI'),
  email: Joi.object({
    host: Joi.string().description('EMAIL SMTP host url'),
    port: Joi.number(),
    service: Joi.string(),
    user: Joi.string().required(),
    pass: Joi.string().required(),
    debug: Joi.boolean().default(false),
    logger: Joi.boolean().default(false)
  })
    .xor('service', 'host')
    .and('host', 'port')
})
  .unknown(false)
  .required();
const config = {
  ...JoiObjectValidator(configVarsSchema, configJSON[configJSON.env]),
  env
};
module.exports = config;
