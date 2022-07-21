import bcrypt from 'bcrypt';

import { UserData } from './../schemas/schemaSignUp.js';
import * as userRepository from "../repositories/userRepository.js";

async function createUser(user: UserData){
    const { email, password, confirmPassword } = user;

    if(password !== confirmPassword) throw {
        type: 'InvalidPassword',
        message: 'Password and confirm password must be the same'
    }

    const userFound = await userFoundInDatabase(email);
    console.log('userFound', userFound);
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

const authService = {
    createUser
}

export default authService;
