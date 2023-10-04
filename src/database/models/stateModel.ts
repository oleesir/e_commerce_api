import { Schema, Document, model } from 'mongoose';

interface IState extends Document {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

const stateSchema = new Schema<IState>(
  {
    name: { type: String, required: true },
    isoCode: { type: String, required: true },
    countryCode: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true },
);

const State = model('State', stateSchema);

export default State;
