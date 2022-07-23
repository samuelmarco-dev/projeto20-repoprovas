import { faker } from "@faker-js/faker";

export function generateTest(){
    return {
        name: faker.lorem.words(),
        pdfUrl: faker.internet.url(),
        categoryId: 2,
        disciplineId: 4,
        teacherId: 2
    }
}
