import joi from 'joi';
import { UserLogin } from './schemaSignUp.js';

const schemaSignIn: joi.ObjectSchema<UserLogin> = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim()
});

export default schemaSignIn;
