import { Request, Response } from 'express';
import Category from '../database/models/categoryModel';

export const getAllCategories = async (req: Request, res: Response) => {
  const data = await Category.find();
  return res.status(200).json({ status: 'success', data });
};
