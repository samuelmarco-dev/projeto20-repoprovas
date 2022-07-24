import { faker } from "@faker-js/faker";

import prisma from "../../src/config/database.js";

export function generateTest(){
    return {
        name: faker.lorem.words(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 2,
        teacherId: 1
    }
}

export async function generateTestOfConflict(){
    const test = {
        name: 'TrackIt',
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teacherDisciplineId: 3
    };

    await prisma.test.create({
        data: {
            ...test
        }
    });

    return test
}
