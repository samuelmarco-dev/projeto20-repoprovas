import { Router } from 'express';

import authRouter from './authRouter.js';
import testRouter from './testRouter.js';
import categoryRouter from './categoryRouter.js';

const routes = Router();

routes.use(authRouter);
routes.use(testRouter);
routes.use(categoryRouter);

export default routes;
