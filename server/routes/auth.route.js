const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
module.exports = router;

const expiresIn = 8.64e7; // ms in 1 day

router.post('/login', function (req, res) {
  let date = new Date();
  res.send({
    expiresAt: new Date(date.getTime() + expiresIn),
    token: authController.generateToken(req.body, expiresIn / 1000), // convert ms to sec for token
  });
});
