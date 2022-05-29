import "regenerator-runtime/runtime";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/index";
import handleError from "./middleware/errorHandler.middleware";
import routes from "./routes/index";
import log from "./utils/logger";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

connect(process.env.MONGO_URI);

app.use(function (req, res, next) {
	console.log(req.headers);
	req.headers.origin = req.headers.origin || req.headers.host;
	next();
});

const allowOrigins = ["http://localhost:5000", "https://oliveshop.netlify.app"];
const corsOptions = {
	credentials: true,
	origin: (origin: any, callback: any) => {
		console.log("ORIGIN", origin);
		const isAllowed = allowOrigins.some((originItem) => originItem.includes(origin));
		if (isAllowed) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(cookieParser());

//API
app.use("/api/v1", routes);

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "MY E-COMMERCE BACKEND",
	});
});

app.use(handleError);
app.listen(port, () => {
	log.info(`listening at http://localhost:${port}`);
});
