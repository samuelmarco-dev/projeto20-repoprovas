import { faker } from "@faker-js/faker";

export function generateTest(){
    return {
        name: faker.lorem.words(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 2,
        teacherId: 1
    }
}
