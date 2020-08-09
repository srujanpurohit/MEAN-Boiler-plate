'use strict';

const nodemailer = require('nodemailer');
const config = require('../../config/config');
const Joi = require('joi');
const JoiObjectValidator = require('../../utils/JoiObjectValidator');

module.exports = async function sendMail(mailData) {
  if (!config.email.host && !config.email.service) {
    return Promise.reject(
      'Host or service not defined for nodemailer in config'
    );
  }
  validate(mailData);
  const transport = nodemailer.createTransport({
    host: config.email.host, //change with your SMTP server url
    port: config.email.port, //change with your SMTP server port
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    },
    // logger: config.email.logger, //TODO research for "logger[level] is not a function" error
    debug: config.email.debug
  });
  try {
    await transport.verify();
  } catch (err) {
    return Promise.reject(err);
  }
  return transporter.sendMail(mailData);
};

function validate(mailObject) {
  const schema = Joi.object({
    from: Joi.string().email().required(),
    to: Joi.string().email().required(),
    subject: Joi.string().required(),
    text: Joi.string(),
    html: Joi.string(),
    attachments: Joi.array().items(
      Joi.object({
        filename: Joi.string(),
        content: Joi.any(),
        contentType: Joi.string(),
        path: Joi.string(),
        encoding: Joi.string(),
        cid: Joi.string()
      }).required()
    )
  }).or('text', 'html', 'attachments');
  JoiObjectValidator(schema, mailObject, {
    stripUnknown: false
  });
}
