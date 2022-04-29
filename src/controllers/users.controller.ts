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
