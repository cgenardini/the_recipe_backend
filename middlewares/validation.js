const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri");
};

module.exports.validateRecipeItemBody = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).messages({
      "string.min": 'the minimum length of the "name" field is 2',
      "string.empty": 'the "name" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": "the URL image field must be filled in",
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    recipeId: Joi.number().required().messages({
      "number.empty": "the id field must be filled in",
    }),
    summary: Joi.string().required().messages({
      "string.empty": 'the "summary" field must be filled in',
    }),
    analyzedInstructions: Joi.array().required().messages({
      "array.empty": "the array must be filled in",
    }),
    sourceName: Joi.string().required().messages({
      "string.empty": "the source must be filled in",
    }),
  }),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'the minimum length of the "name" field is 2',
      "string.max": 'the maxium length of the "name" field is 30',
      "string.empty": 'the "name" field must be filled in',
    }),
    password: Joi.string().required().min(2).messages({
      "string.min": 'the minimum length of the "password" field is 2',
      "string.empty": 'the "password" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'the "email" field must be filled in',
    }),
  }),
});

module.exports.validateUserLogIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'the "email" field must be filled in',
    }),
    password: Joi.string().required().min(2).messages({
      "string.min": 'the minimum length of the "password" field is 2',
      "string.empty": 'the "password" field must be filled in',
    }),
  }),
});

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    recipeId: Joi.string().required().hex().length(24),
  }),
});
