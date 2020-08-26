// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
const chalk = require('chalk');
require('./config/mongoose')
  .init()
  .then(() => require('./config/email').init())
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        chalk.black.bgGreenBright(
          `Server started on port ${config.port} (${config.env})`
        )
      );
    });
  })
  .catch(err => {
    console.log(chalk.bgRed(err));
    process.exit(1);
  });

// For handling synchronous Errors
process.on('uncaughtException', err => {
  console.log(chalk.bgRed(err));
});

// For handling Async Errors
process.on('unhandledRejection', err => {
  console.log(chalk.bgRed(err));
});

module.exports = app;
