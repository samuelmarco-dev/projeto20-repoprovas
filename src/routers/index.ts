import { Router } from 'express';

import authRouter from './authRouter.js';
import testRouter from './testRouter.js';

const routes = Router();

routes.use(authRouter);
routes.use(testRouter);

export default routes;
