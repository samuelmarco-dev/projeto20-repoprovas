import { Router } from 'express';

import { createTest, getTestsDiscipline } from '../controllers/testController.js';
import validationSchema from '../middlewares/schemaMiddleware.js';
import validationToken from '../middlewares/authMiddleware.js';
import schemaTest from '../schemas/schemaTest.js';

const testRouter = Router();

testRouter.post('/test', validationSchema(schemaTest), validationToken, createTest);
testRouter.get('/test/discipline', validationToken, getTestsDiscipline)

export default testRouter;
