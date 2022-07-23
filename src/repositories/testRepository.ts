import dayjs from 'dayjs';

import prisma from "../config/database.js";
import { TestData } from "../schemas/schemaTest.js";
import { TestUnique } from '../services/testService.js';

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

export async function findRelationUnique(test: TestUnique){
    return await prisma.test.findFirst({
        where: {
            name: test.name,
            teacherDisciplineId: test.teacherDisciplineId,
            categoryId: test.categoryId
        }
    })
}

export async function findTestsDiscipline(){
    return await prisma.term.findMany({
        select: {
            id: true,
            number: true,
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    termId: true,
                    teacherDisciplines: {
                        select: {
                            id: true,
                            teacherId: true,
                            disciplineId: true,
                            teacher: true,
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    categoryId: true,
                                    teacherDisciplineId: true,
                                    category: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}
