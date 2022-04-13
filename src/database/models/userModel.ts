import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	isAdmin: boolean;
}

const userSchema = new Schema<IUser>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		isAdmin: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true },
);

const User = model("User", userSchema);

export default User;
