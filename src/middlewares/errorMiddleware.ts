import { NextFunction, Request, Response } from "express";

interface ThrowError {
    type: string;
    message: string;
}

export default function handleError(err, req: Request, res: Response, next: NextFunction){
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
    if(err.type === 'InvalidToken') return true;
    if(err.type === 'TokenExpired') return true;

    return false;
}

function notFound(err: ThrowError){
    if(err.type === 'UserNotFound') return true;
    if(err.type === 'CategoryNotFound') return true;
    if(err.type === 'DisciplineNotFound') return true;
    if(err.type === 'TeacherNotFound') return true;
    if(err.type === 'TeacherDisciplineNotFound') return true;

    return false;
}

function badRequest(err: ThrowError){
    if(err.type === 'MissingData') return true;
    if(err.type === 'InvalidParams') return true;

    return false;
}

function conflict(err: ThrowError){
    if(err.type === 'UserAlreadyExists') return true;
    if(err.type === 'TestAlreadyExist') return true;

    return false;
}
