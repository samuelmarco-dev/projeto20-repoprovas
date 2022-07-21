import { Router } from 'express';
import { createSignIn, createSignUp } from '../controllers/authController.js';

import validationSchema from '../middlewares/schemaMiddleware.js';
import schemaSignIn from '../schemas/schemaSignIn.js';
import schemaSignUp from '../schemas/schemaSignUp.js';

const authRouter = Router();

authRouter.post('/sign-up', validationSchema(schemaSignUp), createSignUp);
authRouter.post('/sign-in', validationSchema(schemaSignIn), createSignIn);

export default authRouter;
