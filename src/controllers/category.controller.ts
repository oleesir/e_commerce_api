import { Request, Response } from 'express';
import Category from '../database/models/categoryModel';

/**
 * get all products
 * @method getAllCategories
 * @memberof categoryController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllCategories = async (req: Request, res: Response) => {
  const data = await Category.find();
  return res.status(200).json({ status: 'success', data });
};
