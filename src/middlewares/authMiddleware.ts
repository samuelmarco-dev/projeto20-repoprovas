import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/jwtFunctions.js";

export interface TokenPayload{
    id: number;
    iat: number;
    expiresIn: number;
}

export default async function validationToken(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    if(!token) return res.status(401).send('Missing token in authorization');

    const verification = await verifyToken(token);
    if(!verification) return res.status(401).send('Error in validation token');

    const { id } = verification as TokenPayload;
    res.locals.id = id;
    next();
}
