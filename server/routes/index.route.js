const express = require('express');
const createError = require('http-errors');
const router = express.Router();
module.exports = router;

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const roleRoutes = require('./role.route');

// GET /ping - Check service health
router.get('/ping', (req, res) => res.send('OK'));

// Module routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

// Catch 404 and forward to error handler
router.use((req, res, next) => {
  return next(createError(404));
});
