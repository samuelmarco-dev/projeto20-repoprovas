import { Router } from 'express';

import { createTest } from '../controllers/testController.js';
import validationSchema from '../middlewares/schemaMiddleware.js';
import schemaTest from '../schemas/schemaTest.js';

const testRouter = Router();

testRouter.post('/test', validationSchema(schemaTest), createTest);

export default testRouter;
