const mongoose = require('mongoose');

const { mongo: mongoConfig } = require('./config');

/**
 * Initiate connection with mongoDB server based on config in env file
 */
exports.init = async () => {
  let mongoUri = 'mongodb://';
  if (mongoConfig.userName && mongoConfig.password) {
    mongoUri += `${mongoConfig.userName}:${encodeURIComponent(
      mongoConfig.password
    )}@`;
  }
  let hosts = '';
  if (mongoConfig.host) {
    // For standalone server
    hosts = `${mongoConfig.host}:${mongoConfig.port}`;
  } else if (
    mongoConfig.socketAddresses &&
    mongoConfig.socketAddresses.length
  ) {
    // For replica set
    mongoConfig.socketAddresses.forEach((socket, index) => {
      hosts += socket;
      if (index < mongoConfig.socketAddresses.length - 1) {
        hosts += ',';
      }
    });
  }
  mongoUri += `${hosts}/${mongoConfig.dbName}`;
  await mongoose.connect(mongoConfig.mongoURI || mongoUri, {
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

  if (mongoConfig.mongooseDebug) {
    mongoose.set('debug', true);
  }
};
