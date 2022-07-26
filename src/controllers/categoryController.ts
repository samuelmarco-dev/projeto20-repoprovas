import { Request, Response } from "express";

import { User } from "@prisma/client";
import { userFoundId } from "../utils/userFunctions.js";
import categoryService from "../services/categoryService.js";

export async function getCategories(req: Request, res: Response){
    const id: number = res.locals.id;
    if(!id) return res.status(400).send('Missing data');

    const user: User = await userFoundId(id);
    if(!user) return res.status(404).send('User not found');

    const categories = await categoryService.findManyCategories();
    res.status(200).send({ categories });
}
