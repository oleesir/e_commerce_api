import express, { Application, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/index';
import handleError from './middleware/errorHandler.middleware';
import routes from './routes/index';
import log from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

connect(process.env.MONGO_URI);

const localhost = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const allowOrigins = [
  localhost,
  'https://checkout.stripe.com',
  'https://olivemarket.netlify.app',
  'https://01a6-142-114-221-195.ngrok-free.app',
];
const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    // undefined origin means request is directly on the server and does not originate from a cross domain call
    const isAllowedOrigin = origin === undefined || allowOrigins.includes(origin);
    if (isAllowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parsing Middleware
app.use((req, res, next) => {
  if (req.originalUrl === '/api/v1/orders/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());

//API
app.use('/api/v1', routes);

app.get('/', (_, res: Response) => {
  return res.status(200).send({
    message: 'MY E-COMMERCE BACKEND',
  });
});

app.use(handleError);
app.listen(port, () => {
  log.info(`listening at http://localhost:${port}`);
});
