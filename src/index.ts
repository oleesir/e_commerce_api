import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 9000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: 'MY E-COMMERCE BACKEND',
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
