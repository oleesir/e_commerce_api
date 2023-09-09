import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import User from '../database/models/userModel';

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
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  return res
    .status(200)
    .json({ status: 'success', data, totalPages: Math.ceil(count / limit), currentPage: page });
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
  const foundUser = await User.findById({ _id });

  if (!foundUser) {
    return res.status(404).json({ status: 'failed', message: 'User does not exist' });
  }

  const data = {
    _id: foundUser?._id,
    firstName: foundUser?.firstName,
    lastName: foundUser?.lastName,
    email: foundUser?.email.toLowerCase(),
    address: foundUser?.address,
    phoneNumber: foundUser?.phoneNumber,
    province: foundUser?.province,
    city: foundUser?.city,
    role: foundUser?.role.toLowerCase(),
  };
  return res.status(200).json({ status: 'success', data });
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
  const { firstName, lastName, email, role, address } = req.body;

  const foundUser = await User.findById({ _id });

  if (!foundUser) {
    return res.status(404).json({ status: 'failed', message: 'User does not exist' });
  }

  foundUser.firstName = firstName || foundUser.firstName;
  foundUser.lastName = lastName || foundUser.lastName;
  foundUser.email = email || foundUser.email;
  foundUser.address = address || foundUser.address;
  foundUser.role = role || foundUser.role;

  const data = await foundUser.save();

  return res.status(200).json({ status: 'success', data });
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

  const foundUser = await User.findById({ _id });

  if (!foundUser) {
    return res.status(404).json({ status: 'failed', message: 'User does not exist' });
  }

  await foundUser.deleteOne();

  return res.status(200).json({ status: 'success', message: 'Successfully deleted' });
};
