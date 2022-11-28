import { roles } from "./../../utils/constants";
import { Schema, Document, model } from "mongoose";
interface IUser extends Document {
	firstName: string;
	lastName: string;
	password: string;
	address: string;
	callingCode:string;
	phoneNumber:string;
	email: string;
	role: string;
}

const userSchema = new Schema<IUser>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
		callingCode: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		address: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		role: { type: String, enum: [roles.ADMIN, roles.SELLER, roles.CUSTOMER], default: roles.CUSTOMER },
	},
	{ timestamps: true },
);

const User = model("User", userSchema);

export default User;
