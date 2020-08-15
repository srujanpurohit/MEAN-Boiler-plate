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
  port: Joi.number().default(8080),
  jwt: Joi.object({
    secret: Joi.string().required().description('JWT Secret required to sign'),
    algo: Joi.string().default('HS256')
  }).required(),
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
    user: Joi.string(),
    password: Joi.string(),
    debug: Joi.boolean().when(env, {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
    logger: Joi.boolean().when(env, {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    })
  }).when(Joi.object({ host: Joi.exist() }), {
    then: Joi.object({
      user: Joi.string().required(),
      password: Joi.string().required()
    }).when(Joi.object({ service: Joi.exist() }), {
      then: Joi.object({
        user: Joi.string().required(),
        password: Joi.string().required()
      })
    })
  })
})
  .unknown(false)
  .required();
const config = {
  ...JoiObjectValidator(configVarsSchema, configJSON[configJSON.env]),
  env
};
module.exports = config;
