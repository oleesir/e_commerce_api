import Joi from 'joi';

export const updateProductSchema = Joi.object().keys({
  name: Joi.string().min(2).messages({
    'string.pattern.base': `"username" should be a type of 'text'`,
    'string.pattern.empty': `"username" cannot be an empty field`,
  }),

  brand: Joi.string().min(2).messages({
    'string.pattern.empty': `"brand" cannot be an empty field`,
  }),
  category: Joi.string().min(2).messages({
    'string.pattern.empty': `"category" cannot be an empty field`,
  }),
  description: Joi.string().min(2).messages({
    'string.pattern.empty': `"description" cannot be an empty field`,
  }),
  price: Joi.number().integer().min(0).messages({
    'string.pattern.empty': `"price" cannot be an empty field`,
  }),
  countInStock: Joi.number().integer().min(0).messages({
    'string.pattern.empty': `"stock" cannot be an empty field`,
  }),
});
