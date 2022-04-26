import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token;

	if (!token) return res.status(401).json({ status: "failed", message: "No token" });

	jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
		if (err) {
			if (err.name === "TokenExpiredError") {
				return res.status(401).json({ status: "failed", message: "Token has expired" });
			}
			return res.status(401).json({ status: "failed", message: "Invalid token" });
		}
		(<any>req).user = decoded;
		next();
	});
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if ((<any>req).user && (<any>req).user.isAdmin) {
		next();
	}
	return res.status(401).json({ status: "failed", message: "Invalid admin token" });
};
