import mongoose, { ConnectOptions } from "mongoose";

export default (db: string | undefined) => {
	const connect = () => {
		mongoose
			.connect(
				db as string,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				} as ConnectOptions,
			)
			.then(() => {
				return console.log(`Successfully connected to db`);
			})
			.catch((error) => {
				console.log("Error connecting to database: ", error);
				return process.exit(1);
			});
	};
	connect();
};
