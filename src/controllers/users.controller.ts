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
	const data = await User.find({});
	res.status(200).json({ status: "success", data });
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
	res.status(200).json({ status: "success", data });
};
