import "regenerator-runtime/runtime";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./database/index";
import handleError from "./middleware/errorHandler.middleware";
import routes from "./routes/index";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

connect(process.env.MONGO_URI);

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
	console.log(`listening at http://localhost:${port}`);
});
