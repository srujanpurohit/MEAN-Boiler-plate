'use strict';
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const createHttpError = require('http-errors');

const securityOptions = {
  password: 0,
  passwordResetToken: 0,
  resetPasswordExpires: 0
};

module.exports = {
  add: async data => {
    data.password = await bcrypt.hash(data.password, 10);
    return new User(data).save().lean();
  },
  find: ({ query = {}, options = {} }) => {
    delete query.password;
    delete query.passwordResetToken;
    return User.paginate(query, {
      ...options,
      select: { ...options.select, ...securityOptions }
    });
  },
  findOne: (query = {}, populateObj, includePasswordFields = false) => {
    let queryOptions;
    if (!includePasswordFields) {
      queryOptions = securityOptions;
      delete query.password;
      delete query.passwordResetToken;
    }
    return User.findOne(query, queryOptions).populate(populateObj);
  },
  findOneWithRoleSummary: query => {
    return User.UserRoleRightSummary(query);
  },
  updateOneById: async (_id, data) => {
    const user = await User.findOneAndUpdate({ _id }, data, {
      new: true
    }).lean();
    if (!user) throw createHttpError(400, `User not found id ${_id}`);
    delete user.password;
    return user;
  },
  updateMany: (query, data) => {
    return User.updateMany(query, data);
  },
  updatePassword: async (_id, password) => {
    password = await bcrypt.hash(password, 10);
    return User.findOneAndUpdate(
      { _id },
      {
        password,
        passwordResetToken: undefined,
        resetPasswordExpires: undefined
      }
    );
  },
  delete: filter => {
    return User.delete(filter);
  }
};
