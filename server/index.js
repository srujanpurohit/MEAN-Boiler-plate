// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');

app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
});

module.exports = app;
