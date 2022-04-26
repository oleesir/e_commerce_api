import { ErrorRequestHandler } from "express";

const handleError: ErrorRequestHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	return res.status(err.status || 500).json({ status: "failure", error: err.message });
};

export default handleError;
