import Joi from 'joi';

export const registerSchema = Joi.object()
  .keys({
    firstName: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .min(2)
      .required()
      .messages({
        'string.pattern.base': `"username" should be a type of 'text'`,
        'string.pattern.empty': `"username" cannot be an empty field`,
        'any.required': `"username" is a required.`,
      }),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .min(2)
      .required()
      .messages({
        'string.pattern.base': `"username" should be a type of 'text'`,
        'string.pattern.empty': `"username" cannot be an empty field`,
        'any.required': `"username" is a required.`,
      }),
    email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
    address: Joi.string().min(2).messages({
      'string.pattern.empty': `"address" cannot be an empty field`,
      'any.required': `"address" is a required.`,
    }),
    password: Joi.string().min(8).required(),
    callingCode: Joi.string(),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
  })
  .options({ allowUnknown: true });
