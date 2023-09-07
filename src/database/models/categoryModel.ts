import { Schema, Document, model } from 'mongoose';

interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Category = model('Category', categorySchema);

export default Category;
