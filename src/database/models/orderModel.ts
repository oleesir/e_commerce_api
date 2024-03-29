import { Schema, Document, model, Types } from 'mongoose';

interface IOrder extends Document {
  userId: Types.ObjectId;
  customerId: string;
  paymentIntentId: string;
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
  receiptUrl: string;
  totalQuantity: number;
  totalPrice: number;
  totalTax: number;
  totalPriceAfterTax: number;
  txStatus: string;
  isDelivered: string;
  paidAt: Date;
  deliveredAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    customerId: { type: String, required: true },
    paymentIntentId: { type: String, required: true },
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
    receiptUrl: { type: String, required: true },
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    totalTax: { type: Number, required: true, default: 0 },
    totalPriceAfterTax: { type: Number, required: true, default: 0 },
    txStatus: {
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
