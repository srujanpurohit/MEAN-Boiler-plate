const mongoose = require('mongoose');

const config = require('./config');

/**
 * Initiate connection with mongoDB server based on config in env file
 */
exports.init = async () => {
  let mongoUri = 'mongodb://';
  if (config.mongo.userName && config.mongo.password) {
    mongoUri += `${config.mongo.userName}:${encodeURIComponent(
      config.mongo.password
    )}@`;
  }
  mongoUri += `${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;

  await mongoose.connect(mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  mongoose.connection.on('error', err => {
    console.log(
      '\x1b[41m\x1b[30m',
      `MongoDB connection Error:\n`,
      err,
      '\x1b[0m'
    );
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(
        '\x1b[43m\x1b[30m',
        'Mongoose default connection disconnected through app termination',
        '\x1b[0m'
      );
      process.exit(0);
    });
  });

  if (config.mongo.mongooseDebug) {
    mongoose.set('debug', true);
  }
};
