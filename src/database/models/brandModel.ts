import { Schema, Document, model } from 'mongoose';

interface IBrand extends Document {
  name: string;
}

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Brand = model('Brand', brandSchema);

export default Brand;
