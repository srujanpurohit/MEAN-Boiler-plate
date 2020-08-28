const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const userController = require('./user.controller');
const bcrypt = require('bcrypt');
const httpError = require('http-errors');
const crypto = require('crypto');
const sendMail = require('../helpers/sendMail');

const expiresIn = 8.64e7; // 1 day in ms

module.exports = {
  login: async ({ email, password }) => {
    const user = await userController.findOneWithRoleSummary({ email });
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
  },

  forgot: async email => {
    const user = await userController.findOne({ email });
    if (!user) throw httpError(400, 'No user exists for this email address');
    const passwordResetToken = await new Promise((resolve, reject) => {
      crypto.randomBytes(3, (err, buffer) => {
        if (err) return reject(err);
        return resolve(buffer.toString('hex'));
      });
    });
    await user
      .set({ passwordResetToken, resetPasswordExpires: Date.now() + 1800000 }) // 30 min from now
      .save();
    await sendMail({
      to: email,
      subject: 'Password reset request',
      text: `
      Hi,

      We recently received a request to recover your account for email: ${email}.

      Please use the following code to verify it's you: ${passwordResetToken}

      If you did not request this, please ignore this email, your password will remain unchanged
    `
    });
    return { message: 'OTP sent via Email' };
  },
  reset: async ({ passwordResetToken, password }) => {
    const user = await userController.findOne(
      {
        passwordResetToken,
        resetPasswordExpires: { $gt: Date.now() }
      },
      undefined,
      true
    );
    if (!user) throw httpError(400, 'Reset Token is invalid or expired');
    await userController.updatePassword(user._id, password);
    return { message: 'Password Updated Successfully.' };
  }
};
function generateToken(userData, expiresIn) {
  return jwt.sign(userData, jwtSecret, {
    expiresIn
  });
}
