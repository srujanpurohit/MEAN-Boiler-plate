const createError = require('http-errors');

const isAdmin = function (req, next, next) {
  if (req.user && req.user.admin) {
    return next();
  }
  return next(createError(401));
};

module.exports = isAdmin;
