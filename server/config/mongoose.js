const mongoose = require('mongoose');

const config = require('./config');

// connect to mongo db
let mongoUri = 'mongodb://';
if (config.mongo.userName && config.mongo.password) {
  mongoUri += `${config.mongo.userName}:${encodeURIComponent(
    config.mongo.password
  )}@`;
}
mongoUri += `${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
mongoose.connect(mongoUri, {
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
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
