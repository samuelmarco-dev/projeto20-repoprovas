import prisma from "../config/database.js";

export async function findTeacherById(id: number){
    return await prisma.teacher.findUnique({
        where: { id }
    })
}
