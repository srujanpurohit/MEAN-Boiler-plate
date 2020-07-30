const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  generateToken: (user, expiresIn) => {
    return jwt.sign(user, config.jwt.secret, { expiresIn });
  },
};
