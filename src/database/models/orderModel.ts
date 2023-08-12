import { Schema, Document, model, Types } from 'mongoose';

interface IOrder extends Document {
  userId: Types.ObjectId;
  email: string;
  address: string;
  phoneNumber: string;
  city: string;
  country: string;
  paymentMethod: string;
  taxPrice: number;
  cartItems: [
    {
      productId: Types.ObjectId;
      quantity: number;
      name: string;
      image: string;
      price: number;
      taxPrice: number;
      priceAfterTax: number;
    },
  ];
  totalQuantity: number;
  totalPrice: number;
  totalTax: number;
  totalPriceAfterTax: number;
  isPaid: string;
  isDelivered: string;
  paidAt: Date;
  deliveredAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    paymentMethod: { type: String, required: true, enum: ['paypal', 'stripe'], default: 'stripe' },
    cartItems: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, default: 0 },
        taxPrice: { type: Number, default: 0 },
        priceAfterTax: { type: Number, default: 0 },
      },
    ],
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    totalTax: { type: Number, required: true, default: 0 },
    totalPriceAfterTax: { type: Number, required: true, default: 0 },
    isPaid: {
      type: String,
      required: true,
      enum: ['successful', 'failed', 'pending'],
      default: 'pending',
    },
    isDelivered: {
      type: String,
      required: true,
      enum: ['completed', 'pending', 'cancelled'],
      default: 'pending',
    },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
);

const Order = model('Order', orderSchema);

export default Order;
