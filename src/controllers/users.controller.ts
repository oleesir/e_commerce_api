import { Request, Response } from "express";
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

	foundUser.firstName = foundUser.firstName || firstName;
	foundUser.lastName = foundUser.lastName || lastName;
	foundUser.email = foundUser.email || email;
	foundUser.isAdmin = Boolean(isAdmin);

	const data = await foundUser.save();

	return res.status(200).json({ status: "success", data });
};
