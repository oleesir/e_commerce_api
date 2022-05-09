import { roles } from "./../../utils/constants";
import { Schema, Document, model } from "mongoose";
interface IUser extends Document {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	role: string;
}

const userSchema = new Schema<IUser>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		role: { type: String, enum: [roles.ADMIN, roles.CLIENT], default: roles.CLIENT },
	},
	{ timestamps: true },
);

const User = model("User", userSchema);

export default User;
