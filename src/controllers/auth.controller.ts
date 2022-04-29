import { Request, Response } from "express";
import User from "../database/models/userModel";
import { generateToken } from "../utils/generateToken";
import comparePassword from "../utils/comparePassword";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

/**
 * Registers a new user
 * @method registerUser
 * @memberof authController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const registerUser = async (req: Request, res: Response) => {
	const { firstName, lastName, password, email } = req.body;

	const findUser = await User.findOne({ email });

	if (findUser) return res.status(400).json({ status: "failed", message: "Email already exist" });

	const hashed = bcrypt.hashSync(password, 10);

	const newUser = new User({ firstName, lastName, email, password: hashed });

	const savedUser = await newUser.save();

	const payload = { _id: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin };

	const token = generateToken(payload, process.env.SECRET_KEY as string);

	const data = {
		_id: savedUser._id,
		firstName: savedUser.firstName,
		lastName: savedUser.lastName,
		email: savedUser.email,
		isAdmin: savedUser.isAdmin,
		token,
	};

	return res
		.status(201)
		.cookie("token", token, {
			maxAge: 1000 * 60 * 60 * 24,
			secure: false,
			httpOnly: true,
			// sameSite: 'lax',
		})
		.json({ status: "success", data });
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

	if (!findUser) return res.status(400).json({ status: "failed", message: "User does not exist" });

	const verifyUserPassword = await comparePassword(password, findUser.password);

	if (!verifyUserPassword) {
		return res.status(401).json({ status: "failure", error: "email or password is incorrect" });
	}

	const payload = {
		_id: findUser._id,
		email: findUser.email,
		isAdmin: findUser.isAdmin,
	};

	const token = generateToken(payload, process.env.SECRET_KEY as string);

	const data = {
		_id: findUser._id,
		firstName: findUser.firstName,
		lastName: findUser.lastName,
		email: findUser.email,
		isAdmin: findUser.isAdmin,
		token,
	};

	return res
		.status(200)
		.cookie("token", token, {
			maxAge: 1000 * 60 * 60 * 24,
			secure: false,
			httpOnly: true,
			// sameSite: 'lax',
		})
		.json({ status: "success", data });
};
