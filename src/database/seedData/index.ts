import { Request, Response } from "express";
import { users, products } from "../data/dummyData";
import User from "../models/userModel";
import Product from "../models/productModel";

export const seedUsers = async (req: Request, res: Response) => {
	await User.deleteMany({});
	const seedUsers = await User.insertMany(users);
	return res.json({ seedUsers });
};

export const seedProducts = async (req: Request, res: Response) => {
	await Product.deleteMany({});
	const seedProducts = await Product.insertMany(products);
	return res.json({ seedProducts });
};
