const Joi = require('joi');
const JoiObjectValidator = require('../utils/JoiObjectValidator');
const httpError = require('http-errors');

module.exports = queryParams => {
  try {
    if (queryParams.query) {
      queryParams.query = JSON.parse(queryParams.query);
    }
    if (queryParams.options) {
      queryParams.options = JSON.parse(queryParams.options);
    }
  } catch (err) {
    throw httpError(400, `Invalid queryParams: ${err.message}`);
  }
  return JoiObjectValidator(
    Joi.object({
      query: Joi.object(),
      options: Joi.object({
        sort: Joi.object().pattern(/^/, Joi.number().valid(-1, 1).required()),
        offset: Joi.number().min(1),
        limit: Joi.when('options.offset', {
          is: Joi.exist(),
          then: Joi.number().min(1).required(),
          otherwise: Joi.number().min(1),
        }),
      }),
    }),
    queryParams
  );
};
