import { Schema, Document, model, Types } from 'mongoose';

interface ICartItems extends Document {
  cartItems: [
    {
      productId: Types.ObjectId;
      quantity: number;
      price: number;
      taxPrice: number;
      priceAfterTax: number;
    },
  ];
  totalQuantity: number;
  totalPrice: number;
  totalTax: number;
  // shippingPrice:number;
  totalPriceAfterTax: number;
  // grandTotal:number;
}

const cartSchema = new Schema<ICartItems>({
  cartItems: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
      taxPrice: { type: Number, default: 0 },
      priceAfterTax: { type: Number, default: 0 },
    },
  ],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  totalTax: { type: Number, required: true, default: 0 },
  // shippingPrice: { type: Number, required: true, default: 0 },
  totalPriceAfterTax: { type: Number, required: true, default: 0 },
  // grandTotal: { type: Number, required: true, default: 0 },
});

const Cart = model('Cart', cartSchema);

export default Cart;
