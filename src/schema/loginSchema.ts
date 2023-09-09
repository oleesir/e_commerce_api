import Joi from 'joi';

export const loginSchema = Joi.object()
  .keys({
    email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
    password: Joi.string().min(8).required(),
  })
  .options({ allowUnknown: true });
