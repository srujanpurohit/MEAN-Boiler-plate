const Joi = require('joi');
const JoiObjectValidator = require('../utils/JoiObjectValidator');

const passwordSchema = Joi.string().required();
const emailSchema = Joi.string().email();

const passwordValidatorSchema = Joi.object({
  password: passwordSchema,
  repeatPassword: Joi.string().required().valid(Joi.ref('password')).strip(),
}).required();
exports.passwordValidator = data => {
  return JoiObjectValidator(passwordValidatorSchema, data);
};

const loginValidatorSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema,
}).required();
exports.loginValidator = data => {
  return JoiObjectValidator(loginValidatorSchema, data);
};

const defaultSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
}).required();

exports.addValidator = userData => {
  const schema = defaultSchema
    .concat(loginValidatorSchema)
    .concat(passwordValidatorSchema);
  return JoiObjectValidator(schema, userData);
};

exports.putValidator = userData => {
  const schema = defaultSchema.append({ email: emailSchema.required() });
  return JoiObjectValidator(schema, userData);
};
exports.patchValidator = userData => {
  return JoiObjectValidator(
    Joi.object({
      email: emailSchema,
      firstName: Joi.string(),
      middleName: Joi.string(),
      lastName: Joi.string(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    }),
    userData
  );
};
