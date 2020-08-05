const createError = require('http-errors');
const Joi = require('joi');
const JoiObjectValidator = require('../utils/JoiObjectValidator');
const { modules } = require('../config/modulesAndRights');

module.exports = function (moduleName, rightName) {
  return function (req, res, next) {
    JoiObjectValidator(Joi.string().valid(...modules), moduleName);
    JoiObjectValidator(
      Joi.string().valid('read', 'create', 'update', 'delete'),
      rightName
    );
    if (
      req.user &&
      req.user.roleSummary &&
      req.user.roleSummary.moduleRights &&
      req.user.roleSummary.moduleRights[moduleName] &&
      req.user.roleSummary.moduleRights[moduleName][rightName] === true
    ) {
      return next();
    }
    return next(createError(401));
  };
};
