import { Request, Response } from 'express';
import User from '../database/models/userModel';
import Province from '../database/models/provinceModel';
import City from '../database/models/cityModel';

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

export const deleteUser = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const foundUser = await User.findById({ _id });

  if (!foundUser) {
    return res.status(404).json({ status: 'failed', message: 'User does not exist' });
  }

  await foundUser.deleteOne();

  return res.status(200).json({ status: 'success', message: 'Successfully deleted' });
};

export const getAllProvinces = async (req: Request, res: Response) => {
  const data = await Province.find();
  return res.status(200).json({ status: 'success', data });
};

export const getProvince = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const foundProvince = await Province.findById({ _id });

  if (!foundProvince) {
    return res.status(404).json({ status: 'failed', message: 'Province does not exist' });
  }

  const data = {
    _id: foundProvince?._id,
    countryCode: foundProvince?.countryCode,
    isoCode: foundProvince?.isoCode,
  };
  return res.status(200).json({ status: 'success', data });
};

export const searchCities = async (req: Request, res: Response) => {
  let name = req.query.name as string;

  if (!name) {
    return res.status(200).json({ status: 'success', products: [] });
  }

  const data = await City.aggregate([
    {
      $search: {
        index: 'search-city',
        autocomplete: {
          query: name,
          path: 'name',
          fuzzy: {
            maxEdits: 2,
            prefixLength: 3,
          },
        },
        highlight: { path: ['name'] },
      },
    },
    { $limit: 10 },
    { $project: { _id: 1, name: 1, stateCode: 1 } },
  ]);

  return res.status(200).json({ status: 'success', data });
};

export const getAllCities = async (req: Request, res: Response) => {
  const data = await City.find();
  return res.status(200).json({ status: 'success', data });
};
