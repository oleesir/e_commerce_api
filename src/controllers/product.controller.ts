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
 * get all products
 * @method searchProducts
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const searchProducts = async (req: Request, res: Response) => {
  let name = req.query.name as string;

  if (!name) {
    return res.status(200).json({ status: 'success', products: [] });
  }

  const agg = [
    {
      $search: {
        index: 'search-text',
        compound: {
          should: [
            {
              text: {
                query: name,
                path: ['name', 'brand'],
                fuzzy: { maxEdits: 1 },
              },
            },
            {
              text: {
                query: name,
                path: ['brand'],
                fuzzy: { maxEdits: 1 },
              },
            },
            {
              text: {
                query: name,
                path: ['category'],
                fuzzy: { maxEdits: 1 },
              },
            },
          ],
        },
      },
    },
    { $limit: 10 },
    { $project: { _id: 1, name: 1, slug: 1, images: 1, rating: 1, numberOfReviews: 1, price: 1 } },
  ];

  const data = await Product.aggregate(agg);

  return res.status(200).json({ status: 'success', data });
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
 * filter products
 * @method filterProduct
 * @memberof productController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const filterProducts = async (req: Request, res: Response) => {
  const { brands, categories, ratings } = req.query;

  const pipeline = [];

  if (brands || categories || ratings) {
    let match: any = {};

    if (brands) {
      match.brand = { $in: (brands as string).split(',') };
    }
    if (categories) {
      match.category = { $in: (categories as string).split(',') };
    }
    if (ratings) {
      match.rating = { $in: (ratings as string).split(',') };
    }

    pipeline.push({ $match: match });
  }

  const data = await Product.aggregate(pipeline);

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

  const data = await Product.findByIdAndUpdate(
    { _id: foundProduct?._id },
    {
      name: name || foundProduct.name,
      description: description || foundProduct.description,
      slug: (name && slugify(name)) || foundProduct.slug,
      category: category || foundProduct.category,
      brand: brand || foundProduct.brand,
      price: price * 100 || foundProduct.price,
      countInStock: countInStock || foundProduct.countInStock,
    },
    { new: true },
  );

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
