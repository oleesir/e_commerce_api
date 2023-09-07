import { Request, Response } from 'express';
import Brand from '../database/models/brandModel';

/**
 * get all products
 * @method getAllBrands
 * @memberof brandController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllBrands = async (req: Request, res: Response) => {
  const data = await Brand.find();
  return res.status(200).json({ status: 'success', data });
};
