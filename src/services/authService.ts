import bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { UserData, UserLogin } from './../schemas/schemaSignUp.js';
import { userFoundInDatabase } from '../utils/userFunctions.js';
import { generateJsonWebToken } from '../utils/jwtFunctions.js';
import * as userRepository from "../repositories/userRepository.js";

async function createUser(user: UserData){
    const { email, password, confirmPassword } = user;

    if(password !== confirmPassword) throw {
        type: 'InvalidPassword',
        message: 'Password and confirm password must be the same'
    }

    const userFound = await userFoundInDatabase(email);
    if(userFound) throw{
        type: 'UserAlreadyExists',
        message: 'User already exists'
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await userRepository.createUser({ email, password: encryptedPassword });
}

async function createLoginUser(user: UserLogin){
    const { email, password } = user;

    const userFound = await userFoundInDatabase(email);
    console.log('userFound', userFound);

    if(!userFound) throw{
        type: 'UserNotFound',
        message: 'User not found'
    }

    await verificationPassword(password, userFound);
    return await generateJsonWebToken(userFound);
}

async function verificationPassword(password: string, user: User){
    const confirmation = await bcrypt.compare(password, user.password);

    if(!confirmation) throw{
        type: 'InvalidPassword',
        message: 'Password is invalid'
    }
    return;
}

const authService = {
    createUser,
    createLoginUser
}

export default authService;
