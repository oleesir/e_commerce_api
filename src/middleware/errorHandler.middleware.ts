import { ErrorRequestHandler } from "express";

/**
 * Handlers uncaught erros in the app
 * @method handleError
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {(function|object)} Function next() or JSON object
 * Gotten from Express Documentation
 */
const handleError: ErrorRequestHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	return res.status(err.status || 500).json({ status: "failure", error: err.message });
};

export default handleError;
