import { Request, Response } from "express";

import { TestData } from "../schemas/schemaTest.js";
import testService from "../services/testService.js";
import { userFoundId } from "../utils/userFunctions.js";

export async function createTest(req: Request, res: Response){
    const id: number = res.locals.id;
    const { name, pdfUrl, categoryId, disciplineId, teacherId }: TestData = req.body;
    if(!id || !name || !pdfUrl || !categoryId || !disciplineId || !teacherId) return res.status(400).send('Missing data');

    const user = await userFoundId(id);
    if(!user) return res.status(404).send('User not found');

    await testService.createTest({ name, pdfUrl, categoryId, disciplineId, teacherId });
    res.sendStatus(201);
}
