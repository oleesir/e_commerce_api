import { Request, Response, NextFunction } from "express";
import User from "../database/models/userModel";
import jwt from "jsonwebtoken";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token;

	if (!token) return res.status(401).json({ status: "failed", message: "No token" });

	jwt.verify(token, process.env.SECRET_KEY as string, async (err: any, decoded: any) => {
		if (err) {
			if (err.name === "TokenExpiredError") {
				return res.status(401).json({ status: "failed", message: "Token has expired" });
			}
			return res.status(401).json({ status: "failed", message: "Invalid token" });
		}

		// const foundUser = await User.findOne({ email: decode.email });

		// if (!foundUser) {
		// 	return res.status(401).json({ status: "failed", message: "Unauthorized" });
		// }

		(<any>req).user = decoded;

		console.log("ROLE", (<any>req).user.role);

		next();
	});
};

export const authorizedRole = (roles: Array<string>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		console.log("ROLLING", (<any>req).user.role);
		if (roles.length && !roles.includes((<any>req).user.role.toLowerCase())) {
			return res
				.status(403)
				.json({ status: "failed", message: "You don't  have the permission to perform this action" });
		}
		next();
	};
};
