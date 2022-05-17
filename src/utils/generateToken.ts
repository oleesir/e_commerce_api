import jwt from "jsonwebtoken";

export const generateToken = (payload: any, secret: string, expiresIn = "1day") =>
	jwt.sign(payload, secret, { expiresIn });

export const generateRefreshToken = (payload: any, secret: string, expiresIn = "1y") =>
	jwt.sign(payload, secret, { expiresIn });
