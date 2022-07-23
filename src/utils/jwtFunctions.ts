import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '@prisma/client';

export async function generateJsonWebToken(user: User){
    const secret = process.env.JWT_SECRET;
    const validity = { expiresIn: 10800 };
    const token = jwt.sign({
        id: user.id
    }, secret, validity);

    return token;
}

export async function verifyToken(token: string){
    try {
        const secret = process.env.JWT_SECRET;
        const verification = jwt.verify(token, secret);
        if(!verification) throw{
            type: "InvalidToken",
            message: "Invalid token"
        }

        return verification;
    } catch (error) {
        if(error.name === "TokenExpiredError") throw{
            type: "TokenExpired",
            message: "Token expired"
        }

        throw {
            type: "InvalidToken",
            message: "Invalid token"
        }
    }
}
