import { Schema, Document, model } from 'mongoose';

interface ICity extends Document {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude: string;
  longitude: string;
}

const citySchema = new Schema<ICity>(
  {
    name: { type: String, required: true },
    countryCode: { type: String, required: true },
    stateCode: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true },
);

const City = model('City', citySchema);

export default City;
