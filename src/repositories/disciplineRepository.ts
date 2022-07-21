import prisma from "../config/database.js";

export async function findDisciplineById(id: number){
    return await prisma.discipline.findUnique({
        where: { id }
    })
}
