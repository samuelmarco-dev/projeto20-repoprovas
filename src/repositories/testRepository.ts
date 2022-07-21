import dayjs from 'dayjs';

import prisma from "../config/database.js";
import { TestData } from "../schemas/schemaTest.js";

type TestRelation = Omit<TestData, "disciplineId" | "teacherId">
interface TestInsert extends TestRelation{
    teacherDisciplineId: number;
}

export async function createTest(test: TestInsert){
    await prisma.test.create({
        data: {
            ...test,
            createdAt: dayjs().format()
        }
    })
}
