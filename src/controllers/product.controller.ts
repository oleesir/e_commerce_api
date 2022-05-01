import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { slugify } from "../utils/slugify";
import Product from "../database/models/productModel";

/**
 * create a product
 * @method createProduct
 * @memberof usersController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createProduct = async (req: Request, res: Response) => {
	let imageFile: Express.Multer.File | undefined = req.file;
	const { name, price, category, brand, countInStock, rating, numberOfReviews, description } = req.body;
	if (!imageFile) {
		return res.status(404).json({ status: "failed", message: "Image not found" });
	}
	const result = await cloudinary.uploader.upload(imageFile.path);

	const product = new Product({
		name,
		slug: slugify(name),
		image: result.secure_url,
		price,
		category,
		brand,
		countInStock,
		rating,
		numberOfReviews,
		description,
	});

	const data = await product.save();
	return res.status(201).json({ status: "success", data });
};
