import { Request, Response } from 'express';
import Brand from '../database/models/brandModel';

export const getAllBrands = async (req: Request, res: Response) => {
  const data = await Brand.find();
  return res.status(200).json({ status: 'success', data });
};
