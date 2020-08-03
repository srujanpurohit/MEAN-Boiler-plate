const Joi = require('joi');
const JoiObjectValidator = require('../utils/JoiObjectValidator');

module.exports = mongoObjectId => {
  return JoiObjectValidator(
    Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .error(new Error('Invalid MongoObjectId')),
    mongoObjectId
  );
};
