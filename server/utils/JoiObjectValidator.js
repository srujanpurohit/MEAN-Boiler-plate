module.exports = function JoiObjectValidator(JoiSchema, data, joiOptions) {
  const { error, value } = JoiSchema.validate(data, joiOptions, {
    stripUnknown: true,
    ...joiOptions,
  });
  if (error) {
    throw error;
  }
  return value;
};
