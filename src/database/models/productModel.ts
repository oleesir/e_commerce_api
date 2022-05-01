import { Schema, Document, model, Types } from "mongoose";

interface IReviews extends Document {
	name: string;
	rating: number;
	comment: string;
	user: Types.ObjectId;
}

interface IProduct extends Document {
	name: string;
	description: string;
	reviews: Types.DocumentArray<IReviews>;
	image: string;
	category: string;
	brand: string;
	rating: number;
	numberOfReviews: number;
	price: number;
	countInStock: number;
}

const reviewSchema = new Schema<IReviews>({
	name: { type: String, required: true },
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const productSchema = new Schema<IProduct>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		reviews: [reviewSchema],
		image: { type: String, required: true, unique: true },
		category: { type: String, required: true },
		brand: { type: String, required: true },
		rating: { type: Number, required: true },
		numberOfReviews: { type: Number, required: true, default: 0 },
		price: { type: Number, required: true, default: 0 },
		countInStock: { type: Number, required: true, default: 0 },
	},
	{ timestamps: true },
);

const Product = model("Product", productSchema);

export default Product;
