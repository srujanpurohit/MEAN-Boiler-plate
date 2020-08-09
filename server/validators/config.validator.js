require('dotenv').config();
const Joi = require('joi');
const JoiObjectValidator = require('../utils/JoiObjectValidator');

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production', 'test')
    .default('development'),
  SERVER_PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  JWT_ALGO: Joi.string().default('HS256'),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_DBNAME: Joi.string().required(),
  MONGO_USER: Joi.string(),
  MONGO_PASSWORD: Joi.string(),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  EMAIL_HOST: Joi.string().description('EMAIL SMTP host url'),
  EMAIL_PORT: Joi.number(),
  EMAIL_SERVICE: Joi.string(),
  EMAIL_USER: Joi.string(),
  EMAIL_PASS: Joi.string(),
  EMAIL_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  EMAIL_LOGGER: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  })
})
  .and('MONGO_USER', 'MONGO_PASSWORD')
  .when(Joi.object({ EMAIL_HOST: Joi.exist() }), {
    then: Joi.object({
      EMAIL_USER: Joi.string().required(),
      EMAIL_PASS: Joi.string().required()
    })
  })
  .when(Joi.object({ EMAIL_SERVICE: Joi.exist() }), {
    then: Joi.object({
      EMAIL_USER: Joi.string().required(),
      EMAIL_PASS: Joi.string().required()
    })
  })
  .unknown()
  .required();

JoiObjectValidator(envVarsSchema, process.env);
