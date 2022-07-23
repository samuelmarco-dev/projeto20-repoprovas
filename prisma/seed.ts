import prisma from "../src/config/database.js";
import populatingDatabase from "./populatingDatabase.js";

async function main(){
    await populatingDatabase.createTerms();
    await populatingDatabase.createCategories();
    await populatingDatabase.createTeachers();
    await populatingDatabase.createDisciplines();
    await populatingDatabase.createTeachersDisciplines();
}
main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
