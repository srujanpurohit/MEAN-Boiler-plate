const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userController = require('./user.controller');
const bcrypt = require('bcrypt');
const httpError = require('http-errors');

const expiresIn = 8.64e7; // 1 day in ms

module.exports = {
  login: async ({ email, password }) => {
    const user = await userController.findOne({ email }, true);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const date = new Date();
        return {
          expiresAt: new Date(date.getTime() + expiresIn), // convert ms to sec for token
          token: generateToken(user.toObject(), expiresIn / 1000) // customize userObject to set selectedFields
        };
      }
    }
    throw httpError(400, 'No user exists for this username and password');
  }
};
function generateToken(userData, expiresIn) {
  return jwt.sign({ ...userData, password: undefined }, config.jwt.secret, {
    expiresIn
  });
}
