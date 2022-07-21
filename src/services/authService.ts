import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '@prisma/client';
import { UserData, UserLogin } from './../schemas/schemaSignUp.js';
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

async function userFoundInDatabase(email: string){
    return await userRepository.findUserByEmail(email);
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
    return generateJsonWebToken(userFound);
}

async function verificationPassword(password: string, user: User){
    const confirmation = await bcrypt.compare(password, user.password);

    if(!confirmation) throw{
        type: 'InvalidPassword',
        message: 'Password is invalid'
    }
    return;
}

function generateJsonWebToken(user: User){
    const secret = process.env.JWT_SECRET;
    const validity = { expiresIn: 10800 };
    const token = jwt.sign({
        id: user.id
    }, secret, validity);

    return token;
}

const authService = {
    createUser,
    createLoginUser
}

export default authService;
