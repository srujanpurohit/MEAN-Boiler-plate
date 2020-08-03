const Joi = require('joi');
const { modules, specialRights } = require('../config/modulesAndRights');
const JoiObjectValidator = require('../utils/JoiObjectValidator');

const nameSchema = Joi.string().trim().alphanum();
const moduleSchema = Joi.string().valid(...modules);
const specialRightsSchema = Joi.array().items(
  Joi.string().valid(...specialRights)
);

exports.addAndPutValidator = data => {
  const schema = Joi.object({
    name: nameSchema.required(),
    moduleRights: Joi.array()
      .items(
        Joi.object({
          module: moduleSchema.required(),
          rights: Joi.object({
            read: Joi.boolean()
              .required()
              .when('create', { is: true, then: Joi.boolean().valid(true) })
              .when('update', { is: true, then: Joi.boolean().valid(true) })
              .when('delete', { is: true, then: Joi.boolean().valid(true) }),
            create: Joi.boolean().required(),
            update: Joi.boolean().required(),
            delete: Joi.boolean().required()
          }).required()
        }).required()
      )
      .required()
      .unique((a, b) => a.module === b.module),
    specialRights: specialRightsSchema.default([])
  });
  return JoiObjectValidator(schema, data);
};

exports.patchValidator = roleData => {
  const schema = Joi.object({
    name: nameSchema,
    moduleRights: Joi.array()
      .items(
        Joi.object({
          module: moduleSchema,
          rights: Joi.object({
            read: Joi.boolean(),
            create: Joi.boolean(),
            update: Joi.boolean(),
            delete: Joi.boolean()
          })
        })
      )
      .unique((a, b) => a.module === b.module),
    specialRights: specialRightsSchema
  });
  return JoiObjectValidator(schema, roleData);
};
