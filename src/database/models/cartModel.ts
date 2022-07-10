import { Schema, Document, model, Types } from "mongoose";

interface ICartItems extends Document {
	user: Types.ObjectId;
	cartItems: [
		{
			product: Types.ObjectId;
			quantity: number;
		},
	];
}

const cartSchema = new Schema<ICartItems>({
	user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	cartItems: [
		{
			product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
			quantity: { type: Number, default: 1 },
		},
	],
});

const Cart = model("Cart", cartSchema);

export default Cart;
