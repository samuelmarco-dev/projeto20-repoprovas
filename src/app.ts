import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routers/index.js';
import handleError from './middlewares/errorMiddleware.js';

const app = express();
app.use(json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(routes);
app.use(handleError);

export default app;
