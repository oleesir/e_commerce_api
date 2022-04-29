import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import User from "../database/models/userModel";

/**
 * get all users
 * @method getAllUsers
 * @memberof usersController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllUsers = async (req: Request, res: Response) => {
	let page = parseInt(req.query.page as string) || 1;
	let limit = parseInt(req.query.limit as string) || 5;

	const count = await User.countDocuments();

	const data = await User.find({})
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.exec();
	return res.status(200).json({ status: "success", data, totalPages: Math.ceil(count / limit), currentPage: page });
};

/**
 * get single user
 * @method getUser
 * @memberof usersController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getUser = async (req: Request, res: Response) => {
	const { _id } = req.params;
	const data = await User.findOne({ _id });

	if (!data) {
		return res.status(404).json({ status: "failed", message: "User does not exist" });
	}
	return res.status(200).json({ status: "success", data });
};

/**
 * update user
 * @method updateUser
 * @memberof usersController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const updateUser = async (req: Request, res: Response) => {
	const { _id } = req.params;
	const { firstName, lastName, email, isAdmin } = req.body;

	const foundUser = await User.findOne({ _id });

	if (!foundUser) {
		return res.status(404).json({ status: "failed", message: "User does not exist" });
	}

	foundUser.firstName = firstName || foundUser.firstName;
	foundUser.lastName = lastName || foundUser.lastName;
	foundUser.email = email || foundUser.email;
	foundUser.isAdmin = Boolean(isAdmin);

	const data = await foundUser.save();

	return res.status(200).json({ status: "success", data });
};

/**
 * update profile
 * @method updateProfile
 * @memberof usersController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const updateProfile = async (req: Request, res: Response) => {
	const { _id } = req.params;
	const { firstName, lastName, email, password } = req.body;

	const foundUser = await User.findOne({ _id });

	if (!foundUser) {
		return res.status(404).json({ status: "failed", message: "User does not exist" });
	}

	foundUser.firstName = firstName || foundUser.firstName;
	foundUser.lastName = lastName || foundUser.lastName;
	foundUser.email = email || foundUser.email;

	if (password) {
		foundUser.password = bcrypt.hashSync(password, 8);
	}

	const updatedUser = await foundUser.save();

	console.log("UPDATED", updateUser);

	const payload = {
		_id: updatedUser._id,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
	};

	const token = generateToken(payload, process.env.SECRET_KEY as string);

	const data = {
		_id: updatedUser._id,
		firstName: updatedUser.firstName,
		lastName: updatedUser.lastName,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
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

/**
 * delete user
 * @method deleteUser
 * @memberof usersController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const deleteUser = async (req: Request, res: Response) => {
	const { _id } = req.params;

	const foundUser = await User.findOne({ _id });

	if (!foundUser) {
		return res.status(404).json({ status: "failed", message: "User does not exist" });
	}

	await foundUser.deleteOne();

	return res.status(200).json({ status: "success", message: "Successfully deleted" });
};
