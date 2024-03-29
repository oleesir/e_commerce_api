import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { slugify } from '../utils/slugify';
import Product from '../database/models/productModel';
import Category from '../database/models/categoryModel';
import Brand from '../database/models/brandModel';

const assignBrandToProduct = async (value: string) => {
  const getValue = await Brand.findOne({ name: value });

  if (!getValue) {
    const brand = new Brand({
      name: value,
    });
    const data = await brand.save();

    return { brandId: data._id, name: data.name };
  }

  return { brandId: getValue._id, name: getValue.name };
};

const assignCategoryToProduct = async (value: string, image: string) => {
  const getValue = await Category.findOne({ name: value });

  if (!getValue) {
    const category = new Category({
      name: value,
      image,
    });
    const data = await category.save();

    return { categoryId: data._id, name: data.name, image: data.image };
  }

  return { categoryId: getValue._id, name: getValue.name, image: getValue.image };
};

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
    category: assignCategoryToProduct(category, cloudinaryUrls[0].secureUrl),
    brand: assignBrandToProduct(brand),
    countInStock,
    rating,
    numberOfReviews,
    description,
  });

  const data = await product.save();
  return res.status(201).json({ status: 'success', data });
};

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

export const searchProducts = async (req: Request, res: Response) => {
  let name = req.query.name as string;

  if (!name) {
    return res.status(200).json({ status: 'success', products: [] });
  }

  const data = await Product.aggregate([
    {
      $search: {
        index: 'search-product',
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
    { $project: { _id: 1, name: 1, images: 1, rating: 1, numberOfReviews: 1, price: 1 } },
  ]);

  return res.status(200).json({ status: 'success', data });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const data = await Product.findById({ _id });

  if (!data) {
    return res.status(404).json({ status: 'failed', message: 'Product does not exist' });
  }
  return res.status(200).json({ status: 'success', data });
};

export const filterProducts = async (req: Request, res: Response) => {
  const { brands, categories, category, brand } = req.query;

  const pipeline = [];

  if (brands || categories || category || brand) {
    let match: any = {};

    if (category) {
      match['category.name'] = category;
    }

    if (brand) {
      match['brand.name'] = brand;
    }

    if (brands) {
      match['brand.name'] = { $in: (brands as string).split(',') };
    }
    if (categories) {
      match['category.name'] = { $in: (categories as string).split(',') };
    }

    pipeline.push({ $match: match });
  }

  if (pipeline.length === 0) {
    console.error('Pipeline is empty. Aborting aggregation.');
    return;
  }

  const data = await Product.aggregate(pipeline);

  return res.status(200).json({ status: 'success', data });
};

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

export const deleteProduct = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const foundProduct = await Product.findById({ _id });

  if (!foundProduct) {
    return res.status(404).json({ status: 'failed', message: 'Product does not exist' });
  }

  await foundProduct.deleteOne();

  return res.status(200).json({ status: 'success', message: 'Successfully deleted' });
};
