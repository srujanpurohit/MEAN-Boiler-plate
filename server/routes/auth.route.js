const express = require('express');
const router = express.Router();
module.exports = router;

const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller');
const userSchemaValidators = require('../validators/userSchema.validators');

router.post(
  '/login',
  asyncHandler(async function (req, res) {
    const token = await authController.login(
      userSchemaValidators.loginValidator(req.body)
    );
    return res.send(token);
  })
);

router.post(
  '/forgot',
  asyncHandler(async function (req, res) {
    const response = await authController.forgot(
      userSchemaValidators.emailValidator(req.body)
    );
    return res.send(response);
  })
);

router.post(
  '/reset',
  asyncHandler(async function (req, res) {
    const response = await authController.reset(
      userSchemaValidators.resetPasswordValidator(req.body)
    );
    return res.send(response);
  })
);
