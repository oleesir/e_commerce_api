import { Schema, Document, model, Types } from "mongoose";


interface IOrder extends Document {
	userId: Types.ObjectId;
	cartId:Types.ObjectId;
	email:string;
	address: string;
	city: string;
	country: string;
	paymentMethod: string;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: string;
	isDelivered:string;
	phoneNumber:string;
	paidAt:Date ,
	deliveredAt: Date;
}



const orderSchema = new Schema<IOrder>(
	{
		userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
		cartId: { type: Schema.Types.ObjectId, required: true, ref: "Cart" },
		email: { type: String, required: true},
		phoneNumber: { type: String, required: true},
		address: { type: String},
		country: { type: String, required: true },
		paymentMethod: { type: String, required: true,enum : ['paypal','stripe'], default: "stripe" },
		taxPrice: {type: Number,required: true, default: 0},
		shippingPrice: { type: Number, required: true, default: 0 },
		totalPrice: { type: Number, required: true, default: 0 },
		isPaid: { type:String, required: true,enum : ['completed','pending',"cancelled"], default: "pending"},
		isDelivered: { type:String, required: true,enum : ['completed','pending',"cancelled"], default: "pending"},
		paidAt: { type: Date },
		deliveredAt: { type: Date },
	},
	{ timestamps: true },
);

const Order = model("Order", orderSchema);

export default Order;
