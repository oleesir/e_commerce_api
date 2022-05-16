import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validateRegisteredUser = (req: Request, res: Response, next: NextFunction) => {
	const registerSchema = Joi.object().keys({
		firstName: Joi.string()
			.regex(/^[a-zA-Z]+$/)
			.required()
			.messages({
				"string.pattern.base": `"username" should be a type of 'text'`,
				"string.pattern.empty": `"username" cannot be an empty field`,
				"any.required": `"username" is a required.`,
			}),
		lastName: Joi.string()
			.regex(/^[a-zA-Z]+$/)
			.required()
			.messages({
				"string.pattern.base": `"username" should be a type of 'text'`,
				"string.pattern.empty": `"username" cannot be an empty field`,
				"any.required": `"username" is a required.`,
			}),
		email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
		address: Joi.string().required().messages({
			"string.pattern.empty": `"address" cannot be an empty field`,
			"any.required": `"address" is a required.`,
		}),
		password: Joi.string().min(8).required(),
	});
	const result = registerSchema.validate(req.body, { abortEarly: false });
	const { error } = result;
	const valid = error == null;
	if (!valid) {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		return res.status(400).json({ error: message });
	}
	next();
};

export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
	const loginSchema = Joi.object().keys({
		email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
		password: Joi.string().min(8).required(),
	});
	const result = loginSchema.validate(req.body, { abortEarly: false });
	const { error } = result;
	const valid = error == null;
	if (!valid) {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		return res.status(400).json({ error: message });
	}
	next();
};

export const validateUpdatedUser = (req: Request, res: Response, next: NextFunction) => {
	const roles = ["admin", "client"];
	const registerSchema = Joi.object().keys({
		firstName: Joi.string()
			.regex(/^[a-zA-Z]+$/)
			.required()
			.messages({
				"string.pattern.base": `"username" should be a type of 'text'`,
				"string.pattern.empty": `"username" cannot be an empty field`,
				"any.required": `"username" is a required.`,
			}),
		lastName: Joi.string()
			.regex(/^[a-zA-Z]+$/)
			.required()
			.messages({
				"string.pattern.base": `"username" should be a type of 'text'`,
				"string.pattern.empty": `"username" cannot be an empty field`,
				"any.required": `"username" is a required.`,
			}),
		email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
		role: Joi.any().valid(...roles),
	});
	const result = registerSchema.validate(req.body, { abortEarly: false });
	const { error } = result;
	const valid = error == null;
	if (!valid) {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		return res.status(400).json({ error: message });
	}
	next();
};

export const validateUserProfile = (req: Request, res: Response, next: NextFunction) => {
	const registerSchema = Joi.object().keys({
		firstName: Joi.string()
			.regex(/^[a-zA-Z]+$/)
			.required()
			.messages({
				"string.pattern.base": `"username" should be a type of 'text'`,
				"string.pattern.empty": `"username" cannot be an empty field`,
				"any.required": `"username" is a required.`,
			}),
		lastName: Joi.string()
			.regex(/^[a-zA-Z]+$/)
			.required()
			.messages({
				"string.pattern.base": `"username" should be a type of 'text'`,
				"string.pattern.empty": `"username" cannot be an empty field`,
				"any.required": `"username" is a required.`,
			}),
		email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
		password: Joi.string().min(8).required(),
	});
	const result = registerSchema.validate(req.body, { abortEarly: false });
	const { error } = result;
	const valid = error == null;
	if (!valid) {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		return res.status(400).json({ error: message });
	}
	next();
};

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
	const registerSchema = Joi.object().keys({
		name: Joi.string().required().messages({
			"string.pattern.base": `"username" should be a type of 'text'`,
			"string.pattern.empty": `"username" cannot be an empty field`,
			"any.required": `"username" is a required.`,
		}),

		image: Joi.string().required(),
		brand: Joi.string().required().messages({
			"string.pattern.empty": `"brand" cannot be an empty field`,
			"any.required": `"brand" is a required.`,
		}),
		category: Joi.string().required().messages({
			"string.pattern.empty": `"category" cannot be an empty field`,
			"any.required": `"category" is a required.`,
		}),
		description: Joi.string().required().messages({
			"string.pattern.empty": `"description" cannot be an empty field`,
			"any.required": `"description" is a required.`,
		}),
		price: Joi.number().integer().min(0).required().messages({
			"string.pattern.empty": `"price" cannot be an empty field`,
			"any.required": `"price" is a required.`,
		}),
		rating: Joi.number().integer().min(0).required().messages({
			"string.pattern.empty": `"rating" cannot be an empty field`,
			"any.required": `"rating" is a required.`,
		}),
		numberOfReviews: Joi.number().integer().min(0).required().messages({
			"string.pattern.empty": `"reviews" cannot be an empty field`,
			"any.required": `"reviews" is a required.`,
		}),
		countInStock: Joi.number().integer().min(0).required().messages({
			"string.pattern.empty": `"stock" cannot be an empty field`,
			"any.required": `"stock" is a required.`,
		}),
	});
	const result = registerSchema.validate(req.body, { abortEarly: false });
	const { error } = result;
	const valid = error == null;
	if (!valid) {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		return res.status(400).json({ error: message });
	}
	next();
};
