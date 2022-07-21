import prisma from "../config/database.js";

export async function findCategoryById(id: number){
    return await prisma.category.findUnique({
        where: { id }
    })
}
