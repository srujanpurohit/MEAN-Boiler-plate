const config = require('./config');
const express = require('express');
const app = express();
const createError = require('http-errors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('../routes/index.route');

module.exports = app;
if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse Cookie header and populate req.cookies with an object
app.use(cookieParser());

// Secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// open api links based routes
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return next(createError(404));
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join('; ');
    err.status = 400;
  }

  // if not http error send 500;
  res.status(err.status || 500).json({
    message: err.message,
  });

  //log error in development
  if (config.env === 'development') {
    next(err);
  } else {
    return;
  }
});
