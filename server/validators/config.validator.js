require('dotenv').config();
const Joi = require('joi');

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
  MONGO_HOST: Joi.string().ip().required().description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_USER: Joi.string(),
  MONGO_DBNAME: Joi.string().required(),
  MONGO_PASSWORD: Joi.string(),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
})
  .and('MONGO_USER', 'MONGO_PASSWORD')
  .unknown()
  .required();
const { error } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation failed: ${error.message}`);
}
