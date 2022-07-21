import { Request, Response } from "express";

import { UserData, UserLogin } from './../schemas/schemaSignUp.js';
import authService from "../services/authService.js";

export async function createSignUp(req: Request, res: Response){
    const { email, password, confirmPassword }: UserData = req.body;
    if(!email || !password || !confirmPassword) return res.sendStatus(400);

    await authService.createUser({ email, password, confirmPassword });
    res.sendStatus(201);
}

export async function createSignIn(req: Request, res: Response){
    const { email, password }: UserLogin = req.body;
    if(!email || !password) return res.sendStatus(400);

    const token = await authService.createLoginUser({ email, password });
    res.status(200).send({ token });
}
