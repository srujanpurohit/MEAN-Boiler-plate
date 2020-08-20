const config = require('./config');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('../routes/index.route');
const compression = require('compression');

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

if (config.usingWebServer) {
  // static files served by web server and no need to add base route for apis
  app.use('', routes);
} else {
  // compress responses
  app.use(compression());

  // open api links based routes
  app.use('/api/', routes);

  // Serve angular files from Express if route is does not contain api
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../dist' + '/index.html'));
  });
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join('; ');
    err.status = 400;
  }

  // if not http error send 500;
  res.status(err.status || 500).json({
    message: err.message
  });

  //log error in development
  if (config.env === 'development') {
    next(err);
  } else {
    return;
  }
});
