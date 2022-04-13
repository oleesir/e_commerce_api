import express, { Application, Request, Response } from "express";
import connect from "./database/index";
import routes from "./routes/index";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

connect(process.env.MONGO_URI);
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API
app.use("/api/v1", routes);

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "MY E-COMMERCE BACKEND",
	});
});

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});
