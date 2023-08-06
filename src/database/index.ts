import mongoose, { ConnectOptions } from 'mongoose';
import log from '../utils/logger';
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
        return log.info(`Successfully connected to db`);
      })
      .catch((error) => {
        log.info('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();
};
