import { CookieOptions, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getGoogleUser } from "./../utils/googleAuthentication";
import User from "../database/models/userModel";
import { generateRefreshToken, generateToken } from "../utils/generateToken";
import comparePassword from "../utils/comparePassword";
import { getGoogleOAuthTokens } from "../utils/googleAuthentication";
import log from "../utils/logger";
dotenv.config();

const accessTokenCookieOptions: CookieOptions = {
	maxAge: 1000 * 60 * 60 * 24,
	secure: true,
	httpOnly: true,
	sameSite: "lax",
};

const refreshTokenCookieOptions: CookieOptions = {
	...accessTokenCookieOptions,
	maxAge: 3.154e10,
};

/**
 * Registers a new user
 * @method registerUser
 * @memberof authController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const registerUser = async (req: Request, res: Response) => {
	const { firstName, lastName, password, email, address } = req.body;

	const findUser = await User.findOne({ email });

	if (findUser) return res.status(400).json({ status: "failed", message: "Email already exist" });

	const hashed = bcrypt.hashSync(password, 10);

	const newUser = new User({ firstName, lastName, email, address, password: hashed });

	const savedUser = await newUser.save();

	const payload = { _id: savedUser._id, email: savedUser.email, role: savedUser.role.toLowerCase() };

	const accessToken = generateToken(payload, process.env.SECRET_KEY as string);
	const refreshToken = generateRefreshToken(payload, process.env.SECRET_KEY as string);

	const data = {
		_id: savedUser._id,
		firstName: savedUser.firstName,
		lastName: savedUser.lastName,
		email: savedUser.email,
		address: savedUser.address,
		role: savedUser.role.toLowerCase(),
		accessToken,
		refreshToken,
	};

	res.cookie("accessToken", accessToken, accessTokenCookieOptions);
	res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
	return res.status(201).json({ status: "success", data });
};

/**
 * Login a new user
 * @method loginUser
 * @memberof authController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const loginUser = async (req: Request, res: Response) => {
	const { password, email } = req.body;

	const findUser = await User.findOne({ email });

	if (!findUser) return res.status(400).json({ status: "failed", message: "email or password is incorrect" });

	const verifyUserPassword = await comparePassword(password, findUser.password);

	if (!verifyUserPassword) {
		return res.status(401).json({ status: "failure", message: "email or password is incorrect" });
	}

	const payload = {
		_id: findUser._id,
		firstName: findUser.firstName,
		lastName: findUser.lastName,
		address: findUser.address,
		email: findUser.email,
		role: findUser.role.toLowerCase(),
	};
	const accessToken = generateToken(payload, process.env.SECRET_KEY as string);
	const refreshToken = generateRefreshToken(payload, process.env.SECRET_KEY as string);

	const data = {
		_id: findUser._id,
		firstName: findUser.firstName,
		lastName: findUser.lastName,
		email: findUser.email,
		address: findUser.address,
		role: findUser.role.toLowerCase(),
		accessToken,
		refreshToken,
	};

	res.cookie("accessToken", accessToken, accessTokenCookieOptions);
	res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
	return res.status(200).json({ status: "success", data });
};

/**
 * loggedInUser
 * @method loggedInUser
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const loggedInUser = async (req: Request, res: Response) => {
	const token: string = req.cookies.accessToken;

	if (!token) return res.json({ status: "failed", data: null });
	return jwt.verify(token, process.env.SECRET_KEY as string, async (err: any, decoded: any) => {
		if (err) {
			return res.json({ status: "failed", data: null });
		}
		const foundUser = await User.findOne({ email: decoded.email });

		if (!foundUser) {
			return res.status(404).json({ status: "failed", message: "User does not exist" });
		}
		const data = {
			_id: foundUser._id,
			firstName: foundUser.firstName,
			lastName: foundUser.lastName,
			address: foundUser.address,
			email: foundUser.email,
			role: foundUser.role.toLowerCase(),
		};

		return res.json({ status: "success", data });
	});
};

/**
 * loggedInUser
 * @method loggedInUser
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const logoutUser = async (req: Request, res: Response) => {
	const token: string = req.cookies.accessToken;
	if (!token) return res.status(403).json({ status: "failure", error: "token not found" });
	return res.clearCookie("accessToken").status(200).json({ message: "Successfully logged out" });
};

/**
 * googleOAuth
 * @method googleOAuth
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const googleOAuth = async (req: Request, res: Response) => {
	try {
		//get the code from qs
		const code = req.query.code as string;
		//get the id and access token with the code
		const { id_token, access_token } = await getGoogleOAuthTokens({ code });
		//get user with tokens
		const googleUser = await getGoogleUser({ id_token, access_token });
		//upsert the user
		const user = await User.findOneAndUpdate(
			{
				email: googleUser.email,
			},
			{
				email: googleUser.email,
				firstName: googleUser.given_name,
				lastName: googleUser.family_name,
			},
			{
				upsert: true,
				new: true,
			},
		);

		//create access and refresh tokens
		const payload = {
			_id: user._id,
			email: user.email,
			role: user.role,
		};

		const accessToken = generateToken(payload, process.env.SECRET_KEY as string);
		const refreshToken = generateRefreshToken(payload, process.env.SECRET_KEY as string);
		//set cookies
		res.cookie("accessToken", accessToken, accessTokenCookieOptions);
		res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
		//redirect back to client
		return res.redirect(process.env.FRONTEND_URL as string);
	} catch (error) {
		log.error(error, "Failed to authorize Google user");
		return res.redirect(`${process.env.FRONTEND_URL as string}/oauth/error`);
	}
};
