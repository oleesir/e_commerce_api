import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { slugify } from '../utils/slugify';
import Product from '../database/models/productModel';

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
  const { name, price, category, brand, countInStock, rating, numberOfReviews, description } =
    req.body;

  if (!imageFiles || !Array.isArray(imageFiles)) {
    return res.status(404).json({ status: 'failed', message: 'Image not found' });
  }

  let multiplePicturePromise = imageFiles.map((image: any) =>
    cloudinary.uploader.upload(image.path),
  );

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
  return res.status(201).json({ status: 'success', data });
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
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  return res
    .status(200)
    .json({ status: 'success', data, totalPages: Math.ceil(count / limit), currentPage: page });
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
  const { _id } = req.params;
  const data = await Product.findById({ _id });

  if (!data) {
    return res.status(404).json({ status: 'failed', message: 'Product does not exist' });
  }
  return res.status(200).json({ status: 'success', data });
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
  const { _id } = req.params;
  const { name, description, category, brand, price, countInStock } = req.body;
  const foundProduct = await Product.findById({ _id });

  if (!foundProduct) {
    return res.status(404).json({ status: 'failed', message: 'Product does not exist' });
  }

  foundProduct.name = name || foundProduct.name;
  foundProduct.description = description || foundProduct.description;
  foundProduct.slug = (name && slugify(name)) || foundProduct.slug;
  foundProduct.category = category || foundProduct.category;
  foundProduct.brand = brand || foundProduct.brand;
  foundProduct.price = price * 100 || foundProduct.price;
  foundProduct.countInStock = countInStock || foundProduct.countInStock;

  const data = await foundProduct.save();

  return res.status(200).json({ status: 'success', data });
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
  const { _id } = req.params;
  const foundProduct = await Product.findById({ _id });

  if (!foundProduct) {
    return res.status(404).json({ status: 'failed', message: 'Product does not exist' });
  }

  await foundProduct.deleteOne();

  return res.status(200).json({ status: 'success', message: 'Successfully deleted' });
};
