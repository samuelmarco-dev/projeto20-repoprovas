import { Request, Response } from "express";

import { User } from "@prisma/client";
import { TestData } from "../schemas/schemaTest.js";
import testService from "../services/testService.js";
import { userFoundId } from "../utils/userFunctions.js";
import verifyBodyInRequest from "../utils/dataFunction.js";

export async function createTest(req: Request, res: Response){
    const id: number = res.locals.id;
    const { name, pdfUrl, categoryId, disciplineId, teacherId }: TestData = req.body;

    if(!id || !name || !pdfUrl || !categoryId || !disciplineId || !teacherId) return res.status(400).send('Missing data');
    if(!verifyBodyInRequest({ categoryId, disciplineId, teacherId })) return res.status(400).send('Invalid data');

    const user: User = await userFoundId(id);
    if(!user) return res.status(404).send('User not found');

    await testService.createTest({ name, pdfUrl, categoryId, disciplineId, teacherId });
    res.sendStatus(201);
}

export async function getTestsDiscipline(req: Request, res: Response){
    const id: number = res.locals.id;
    if(!id) return res.status(400).send('Missing data');

    const user: User = await userFoundId(id);
    if(!user) return res.status(404).send('User not found');

    const testsDisciplines = await testService.getTestsDiscipline();
    res.status(200).send(testsDisciplines);
}

export async function getTestsTeacher(req: Request, res: Response){
    const id: number = res.locals.id;
    if(!id) return res.status(400).send('Missing data');

    const user: User = await userFoundId(id);
    if(!user) return res.status(404).send('User not found');

    const testsTeachers = await testService.getTestsTeacher();
    res.status(200).send(testsTeachers);
}
