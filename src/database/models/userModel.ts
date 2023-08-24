import { roles } from '../../utils/constants';
import { Schema, Document, model, Types } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  address: string | undefined;
  phoneNumber: string | undefined;
  province: string | undefined;
  city: string | undefined;
  email: string;
  role: string;
  cartId: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    province: { type: String, default: '' },
    city: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: [roles.ADMIN, roles.SELLER, roles.CUSTOMER],
      default: roles.CUSTOMER,
    },
    cartId: { type: Schema.Types.ObjectId, required: true, ref: 'Cart' },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
