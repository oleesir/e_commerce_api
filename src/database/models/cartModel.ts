import { Schema, Document, model, Types } from "mongoose";

interface ICartItems extends Document {
	userId: Types.ObjectId;
	cartItems: [
		{
			productId: Types.ObjectId;
			quantity: number;
			price: number;
		},
	];
}

const cartSchema = new Schema<ICartItems>({
	userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	cartItems: [
		{
			productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
			quantity: { type: Number, default: 1 },
			price: { type: Number, default: 0 },
		},
	],
});

const Cart = model("Cart", cartSchema);

export default Cart;
