const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userController = require('./user.controller');
const bcrypt = require('bcrypt');
const httpError = require('http-errors');

const expiresIn = 8.64e7; // 1 day in ms

module.exports = {
  login: async ({ email, password }) => {
    let user = await userController.findOneWithRoleSummary({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        delete user.password;
        user.admin = user.roleSummary.specialRights.includes('admin');
        const date = new Date();
        return {
          expiresAt: new Date(date.getTime() + expiresIn), // convert ms to sec for token
          token: generateToken(user, expiresIn / 1000), // customize userObject to set selectedFields
          userData: user
        };
      }
    }
    throw httpError(400, 'No user exists for this username and password');
  }
};
function generateToken(userData, expiresIn) {
  return jwt.sign(userData, config.jwt.secret, {
    expiresIn
  });
}
