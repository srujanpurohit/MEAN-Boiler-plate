// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose')
  .init()
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        '\x1b[42m\x1b[30m',
        `Server started on port ${config.port} (${config.env})`,
        '\x1b[0m'
      );
    });
  })
  .catch(err => {
    console.log('\x1b[41m\x1b[30m', err, '\x1b[0m');
    process.exit(1);
  });

// For handling synchronous Errors
process.on('uncaughtException', err => {
  console.log(
    '\x1b[41m\x1b[30m',
    'An unhandled exception was caught: \n',
    err,
    '\x1b[0m'
  );
});

// For handling Async Errors
process.on('unhandledRejection', err => {
  console.log(
    '\x1b[41m\x1b[30m',
    'An unhandled promise rejection was caught: \n',
    err,
    '\x1b[0m'
  );
});

module.exports = app;
