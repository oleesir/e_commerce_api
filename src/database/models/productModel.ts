import { Schema, Document, model, Types } from 'mongoose';

interface IReviews extends Document {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

interface IImages extends Document {
  secureUrl: string;
  cloudinaryId: string;
}

interface ICategory extends Document {
  categoryId: Types.ObjectId;
  name: string;
}

interface IBrand extends Document {
  brandId: Types.ObjectId;
  name: string;
}

interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  reviews: Types.DocumentArray<IReviews>;
  images: Types.DocumentArray<IImages>;
  category: Types.Subdocument<ICategory>;
  brand: Types.Subdocument<IBrand>;
  rating: number;
  numberOfReviews: number;
  price: number;
  countInStock: number;
}

const reviewSchema = new Schema<IReviews>({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

const imageSchema = new Schema<IImages>({
  secureUrl: { type: String },
  cloudinaryId: { type: String },
});

const categorySchema = new Schema<ICategory>({
  categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  name: { type: String, required: true },
});

const brandSchema = new Schema<IBrand>({
  brandId: { type: Schema.Types.ObjectId, required: true, ref: 'Brand' },
  name: { type: String, required: true },
});

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    images: [imageSchema],
    category: categorySchema,
    brand: brandSchema,
    rating: { type: Number, required: true },
    numberOfReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const Product = model('Product', productSchema);

export default Product;
