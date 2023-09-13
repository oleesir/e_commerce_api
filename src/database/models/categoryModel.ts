import { Schema, Document, model } from 'mongoose';

interface ICategory extends Document {
  name: string;
  image: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

const Category = model('Category', categorySchema);

export default Category;
