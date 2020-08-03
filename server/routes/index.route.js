const express = require('express');
const jwt = require('express-jwt');
const config = require('../config/config');
const router = express.Router();
module.exports = router;

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');

// GET /ping - Check service health
router.get('/ping', (req, res) => res.send('OK'));

// verify user is authenticated for all routes below this middleware
router.use(
  jwt({ secret: config.jwt.secret, algorithms: [config.jwt.algo] }).unless({
    path: ['/api/auth/login'],
  })
);

// module routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
