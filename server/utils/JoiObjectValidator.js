module.exports = function JoiObjectValidator(JoiSchema, data, joiOptions) {
  const { error, value } = JoiSchema.validate(data, {
    stripUnknown: true,
    ...joiOptions
  });
  if (error) {
    throw error;
  }
  return value;
};
