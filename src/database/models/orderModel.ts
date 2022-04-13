import { Schema, Document, model, Types } from "mongoose";

interface IPaymentResult extends Document {
	id: string;
	status: string;
	updateTime: string;
	emailAddress: string;
}

interface IOrderItems extends Document {
	name: string;
	quantity: number;
	image: string;
	price: number;
	product: Types.ObjectId;
}

interface IOrder extends Document {
	user: Types.ObjectId;
	orderItems: Types.DocumentArray<IOrderItems>;
	address: string;
	city: string;
	postalCode: string;
	country: string;
	paymentMethod: string;
	paymentResult: IPaymentResult;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: Date;
	isDelivered: boolean;
	deliveredAt: Date;
}

const paymentResultSchema = new Schema<IPaymentResult>({
	id: { type: String },
	status: { type: String },
	updateTime: { type: String },
	emailAddress: { type: String },
});

const orderItemsSchema = new Schema<IOrderItems>({
	name: { type: String, required: true },
	quantity: { type: Number, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
});

const orderSchema = new Schema<IOrder>(
	{
		user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
		orderItems: [orderItemsSchema],
		address: { type: String, required: true },
		city: { type: String, required: true },
		postalCode: { type: String, required: true },
		country: { type: String, required: true },
		paymentMethod: { type: String, required: true, default: "Paypal" },
		paymentResult: paymentResultSchema,
		taxPrice: { type: Number, required: true, default: 0.0 },
		shippingPrice: { type: Number, required: true, default: 0.0 },
		totalPrice: { type: Number, required: true, default: 0.0 },
		isPaid: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, required: true, default: false },
		deliveredAt: { type: Date },
	},
	{ timestamps: true },
);

const Order = model("Order", orderSchema);

export default Order;
