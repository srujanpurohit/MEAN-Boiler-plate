const createError = require('http-errors');
const { specialRights } = require('../config/modulesAndRights');

module.exports = function (req, next, next) {
  /**
   * Check if user has right to given module
   * @param {string} SpecialRightName
   */
  module.exports = function (SpecialRightName) {
    return function (req, res, next) {
      JoiObjectValidator(
        Joi.string().valid(...specialRights),
        SpecialRightName
      );
      if (
        req.user &&
        req.user.roleSummary &&
        req.user.roleSummary.specialRights.indexOf(SpecialRightName) > -1
      ) {
        return next();
      }
      return next(createError(401));
    };
  };
};
