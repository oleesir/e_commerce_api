import mongoose, { ConnectOptions } from "mongoose";
import { users, products } from "../data/dummyData";
import User from "../models/userModel";
import Product from "../models/productModel";
import dotenv from "dotenv";
dotenv.config();

mongoose
	.connect(
		process.env.MONGO_URI as string,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions,
	)
	.then(() => {
		console.log("Db seeded successfully");
	})
	.catch((err) => {
		console.log(err);
	});

const seedDB = async () => {
	await User.deleteMany({});
	await User.insertMany(users);
	await Product.deleteMany({});
	await Product.insertMany(products);
};

seedDB().then(() => {
	mongoose.connection.close();
});
