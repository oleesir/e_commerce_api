import { roles } from '../utils/constants';
import Joi from 'joi';

const authRoles = [roles.ADMIN, roles.SELLER, roles.CUSTOMER];
export const updateUserSchema = Joi.object().keys({
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
  role: Joi.any().valid(...authRoles),
});
