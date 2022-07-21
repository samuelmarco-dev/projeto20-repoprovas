import joi from 'joi';
import { User } from '@prisma/client';

export type UserLogin = Omit<User, "id" | "createdAt">
export interface UserData extends UserLogin {
    confirmPassword: string;
}
const schemaSignUp: joi.ObjectSchema<UserData> = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim(),
    confirmPassword: joi.string().valid(joi.ref("password")).required().trim()
});

export default schemaSignUp;
