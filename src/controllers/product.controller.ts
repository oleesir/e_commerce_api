import {Request, Response} from "express";
import cloudinary from "../utils/cloudinary";
import {slugify} from "../utils/slugify";
import Product from "../database/models/productModel";

/**
 * create a product
 * @method createProduct
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createProduct = async (req: Request, res: Response) => {
	let imageFiles = req.files;
	const {name, price, category, brand, countInStock, rating, numberOfReviews, description} = req.body;

	if (!imageFiles || !Array.isArray(imageFiles)) {
		return res.status(404).json({status: "failed", message: "Image not found"});
	}

	let multiplePicturePromise = imageFiles.map((image: any) => cloudinary.uploader.upload(image.path));

	let imageResponses = await Promise.all(multiplePicturePromise);
	const cloudinaryUrls = imageResponses.map((img) => {
		return {
			secureUrl: img.secure_url,
			cloudinaryId: img.public_id,
		};
	});

	const product = new Product({
		name,
		slug: slugify(name),
		images: cloudinaryUrls,
		price: price * 100,
		category,
		brand,
		countInStock,
		rating,
		numberOfReviews,
		description,
	});

	const data = await product.save();
	return res.status(201).json({status: "success", data});
};

/**
 * search for products
 * @method searchProducts
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const searchProducts = async (req: Request, res: Response) => {
	const {query} = req;

	const pageSize = Number(query.pageSize) || Number(process.env.PAGE_SIZE);
	const page = Number(query.page) || 1;
	const category = query.category || "";
	const price = (query.price as string) || ("" as string);
	const rating = query.rating || "";
	const order = query.orders || "";
	const searchQuery = query.query || "";

	const categoryFilter = category && category !== "all" ? {category} : {};
	const queryFilter = searchQuery && searchQuery !== "all" ? {name: {$regex: searchQuery, $options: "i"}} : {};
	const priceFilter =
		price && price !== "all"
			? {
				price: {
					$gte: Number(price.split("-")[0]),
					$lte: Number(price.split("-")[1]),
				},
			}
			: {};
	const ratingsFilter = rating && rating !== "all" ? {$gte: Number(rating)} : {};
	const ordersFilter =
		order && order === "featured"
			? {featured: -1}
			: order === "highest"
				? {price: -1}
				: order === "lowest"
					? {price: 1}
					: order === "newest"
						? {createdAt: -1}
						: order === "toprated"
							? {rating: -1}
							: {_id: -1};

	const data = await Product.find({...categoryFilter, ...queryFilter, ...ratingsFilter, ...priceFilter})
		.sort(ordersFilter)
		.skip(pageSize * (page - 1))
		.limit(pageSize);

	const countedData = await Product.countDocuments({
		...categoryFilter,
		...queryFilter,
		...ratingsFilter,
		...priceFilter,
	});

	return res.status(200).json({status: "success", countedData, data, page, pages: Math.ceil(countedData / pageSize)});
};

/**
 * get all products
 * @method getAllProducts
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllProducts = async (req: Request, res: Response) => {
	let page = parseInt(req.query.page as string) || 1;
	let limit = parseInt(req.query.limit as string) || 50;

	const count = await Product.countDocuments();
	const data = await Product.find({})
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.exec();
	return res.status(200).json({status: "success", data, totalPages: Math.ceil(count / limit), currentPage: page});
};

/**
 * get a single product
 * @method getSingleProduct
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getSingleProduct = async (req: Request, res: Response) => {
	const {_id} = req.params;
	const data = await Product.findById({_id});

	if (!data) {
		return res.status(404).json({status: "failed", message: "Product does not exist"});
	}
	return res.status(200).json({status: "success", data});
};

/**
 * update product
 * @method updateProduct
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const updateProduct = async (req: Request, res: Response) => {
	const {_id} = req.params;
	const {name, description, category, brand, price, countInStock} = req.body;
	const foundProduct = await Product.findById({_id});

	if (!foundProduct) {
		return res.status(404).json({status: "failed", message: "Product does not exist"});
	}

	foundProduct.name = name || foundProduct.name;
	foundProduct.description = description || foundProduct.description;
	foundProduct.slug = (name && slugify(name)) || foundProduct.slug;
	foundProduct.category = category || foundProduct.category;
	foundProduct.brand = brand || foundProduct.brand;
	foundProduct.price = price * 100 || foundProduct.price;
	foundProduct.countInStock = countInStock || foundProduct.countInStock;

	const data = await foundProduct.save();

	return res.status(200).json({status: "success", data});
};

/**
 * delete product
 * @method deleteProduct
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const deleteProduct = async (req: Request, res: Response) => {
	const {_id} = req.params;
	const foundProduct = await Product.findById({_id});

	if (!foundProduct) {
		return res.status(404).json({status: "failed", message: "Product does not exist"});
	}

	await foundProduct.deleteOne();

	return res.status(200).json({status: "success", message: "Successfully deleted"});
};
