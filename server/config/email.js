const nodemailer = require('nodemailer');
const { email } = require('./config');

let transporter;
exports.init = function () {
  if (transporter) return Promise.reject('Transporter already initiated');
  if (email) {
    transporter = nodemailer.createTransport({
      host: email.host,
      port: email.port,
      service: email.service,
      auth: {
        user: email.user,
        pass: email.pass
      },
      logger: email.logger,
      debug: email.debug
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
