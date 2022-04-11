import express, { Application, Request, Response } from "express";
import connect from "./database/index";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 9000;

connect(process.env.MONGO_URI);
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "MY E-COMMERCE BACKEND",
	});
});

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});
