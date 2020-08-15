const express = require('express');
const jwt = require('express-jwt');
const config = require('../config/config');
const createError = require('http-errors');
const router = express.Router();
module.exports = router;

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const roleRoutes = require('./role.route');

// GET /ping - Check service health
router.get('/ping', (req, res) => res.send('OK'));

// verify user is authenticated for all routes below this middleware
router.use(
  jwt({ secret: config.jwt.secret, algorithms: [config.jwt.algo] }).unless({
    path: ['/api/auth/login']
  })
);

// module routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  return next(createError(404));
});
