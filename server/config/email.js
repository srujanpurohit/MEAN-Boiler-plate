const nodemailer = require('nodemailer');
const config = require('./config');

let transporter;
exports.init = function () {
  if (transporter) return Promise.reject('Transporter already initiated');
  if (config.email) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      service: config.email.service,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      },
      logger: config.email.logger,
      debug: config.email.debug
    });
    return transporter.verify();
  }
  return Promise.resolve(
    'Skipping Transporter as email is not configured in json'
  );
};

exports.getTransporter = () => {
  if (!transporter) throw new Error('Email transporter not initialized');
  return transporter;
};
