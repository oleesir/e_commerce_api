import { Schema, Document, model } from 'mongoose';

interface IProvince extends Document {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

const provinceSchema = new Schema<IProvince>(
  {
    name: { type: String, required: true },
    isoCode: { type: String, required: true },
    countryCode: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true },
);

const Province = model('Province', provinceSchema);

export default Province;
