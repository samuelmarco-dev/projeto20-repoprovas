import dayjs from "dayjs";

import prisma from "../config/database.js";
import { UserLogin } from './../schemas/schemaSignUp.js';

export async function findUserByEmail(email: string){
    return await prisma.user.findUnique({
        where: { email }
    })
}

export async function createUser(user: UserLogin){
    await prisma.user.create({
        data: {
            ...user,
            createdAt: dayjs().format()
        }
    })
}
