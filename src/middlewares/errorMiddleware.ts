import { NextFunction, Request, Response } from "express";
import chalk from 'chalk';

interface ThrowError {
    type: string;
    message: string;
}

export default function handleError(err, req: Request, res: Response, next: NextFunction){
    console.log(chalk.red('Error: ', err));
    if(err){
        if(badRequest) return res.status(400).send(err.message);
        if(unauthorized(err)) return res.status(401).send(err.message);
        if(notFound) return res.status(404).send(err.message);
        if(conflict) return res.status(409).send(err.message);
    }

    res.status(500).send(`Server Error`);
}

function unauthorized(err: ThrowError){
    return true;
}

function notFound(err: ThrowError){
    return true;
}

function badRequest(err: ThrowError){
    return true;
}

function conflict(err: ThrowError){
    return true;
}