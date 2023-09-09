import Joi from 'joi';

export const createProductSchema = Joi.object().keys({
  name: Joi.string().min(2).required().messages({
    'string.pattern.base': `"username" should be a type of 'text'`,
    'string.pattern.empty': `"username" cannot be an empty field`,
    'any.required': `"username" is a required.`,
  }),

  brand: Joi.string().min(2).required().messages({
    'string.pattern.empty': `"brand" cannot be an empty field`,
    'any.required': `"brand" is a required.`,
  }),
  category: Joi.string().required().min(2).messages({
    'string.pattern.empty': `"category" cannot be an empty field`,
    'any.required': `"category" is a required.`,
  }),
  description: Joi.string().required().min(2).messages({
    'string.pattern.empty': `"description" cannot be an empty field`,
    'any.required': `"description" is a required.`,
  }),
  price: Joi.number().integer().min(0).required().messages({
    'string.pattern.empty': `"price" cannot be an empty field`,
    'any.required': `"price" is a required.`,
  }),
  rating: Joi.number().integer().min(0).required().messages({
    'string.pattern.empty': `"rating" cannot be an empty field`,
    'any.required': `"rating" is a required.`,
  }),
  numberOfReviews: Joi.number().integer().min(0).required().messages({
    'string.pattern.empty': `"reviews" cannot be an empty field`,
    'any.required': `"reviews" is a required.`,
  }),
  countInStock: Joi.number().integer().min(0).required().messages({
    'string.pattern.empty': `"stock" cannot be an empty field`,
    'any.required': `"stock" is a required.`,
  }),
});
