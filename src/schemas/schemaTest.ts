import joi from 'joi';

export interface TestData{
    name: string;
    urlPdf: string;
    categoryId: number;
    disciplineId: number;
    teacherId: number;
}

const schemaTest: joi.ObjectSchema<TestData> = joi.object({
    name: joi.string().required(),
    urlPdf: joi.string().required().trim(),
    categoryId: joi.number().integer().required(),
    disciplineId: joi.number().integer().required(),
    teacherId: joi.number().integer().required()
});

export default schemaTest;
