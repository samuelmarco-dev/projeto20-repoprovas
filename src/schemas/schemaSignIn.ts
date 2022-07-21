import joi from 'joi';
import { UserLogin } from './schemaSignUp.js';

const schemaSignIn: joi.ObjectSchema<UserLogin> = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default schemaSignIn;
