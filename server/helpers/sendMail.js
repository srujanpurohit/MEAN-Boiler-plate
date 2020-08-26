'use strict';

const Joi = require('joi');
const JoiObjectValidator = require('../utils/JoiObjectValidator');
const getTransporter = require('../config/email').getTransporter;

/**
 *
 * @param {{from:email
to:email
subject:string
text: string
html: string
attachments:any}} mailData
 */
module.exports = function sendMail(mailData) {
  validateSchema(mailData);
  return getTransporter().sendMail(mailData);
};

function validateSchema(mailObject) {
  const schema = Joi.object({
    from: Joi.string().email().default('noreply@example.com'),
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
