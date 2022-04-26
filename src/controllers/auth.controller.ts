import { Request, Response } from "express";
import User from "../database/models/userModel";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
	const { firstName, lastName, password, email } = req.body;

	const findUser = await User.findOne({ email });

	if (findUser) return res.status(400).json({ status: "failed", message: "Email already exist" });

	const payload = { email };

	const token = generateToken(payload, process.env.SECRET_KEY as string);
	const hashed = bcrypt.hashSync(password, 10);

	const newUser = new User({ firstName, lastName, email, password: hashed });

	const savedUser = await newUser.save();

	const data = {
		_id: savedUser._id,
		firstName: savedUser.firstName,
		lastName: savedUser.lastName,
		email: savedUser.email,
		isAdmin: savedUser.isAdmin,
		token,
	};

	return res
		.status(201)
		.cookie("token", token, {
			maxAge: 1000 * 60 * 60,
			secure: false,
			httpOnly: true,
			// sameSite: 'lax',
		})
		.json({ status: "success", data });
};
