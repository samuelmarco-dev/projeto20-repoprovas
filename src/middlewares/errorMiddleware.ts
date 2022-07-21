import { NextFunction, Request, Response } from "express";
import chalk from 'chalk';

interface ThrowError {
    type: string;
    message: string;
}

export default function handleError(err, req: Request, res: Response, next: NextFunction){
    console.log(chalk.red('Error: ', err));
    if(err){
        if(badRequest(err)) return res.status(400).send(err.message);
        if(unauthorized(err)) return res.status(401).send(err.message);
        if(notFound(err)) return res.status(404).send(err.message);
        if(conflict(err)) return res.status(409).send(err.message);
    }

    res.status(500).send(`Server Error`);
}

function unauthorized(err: ThrowError){
    if(err.type === 'InvalidPassword') return true;

    return false;
}

function notFound(err: ThrowError){
    if(err.type === 'UserNotFound') return true;

    return false;
}

function badRequest(err: ThrowError){
    return false;
}

function conflict(err: ThrowError){
    if(err.type === 'UserAlreadyExists') return true;

    return false;
}
