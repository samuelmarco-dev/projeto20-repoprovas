import prisma from "../config/database.js";

export async function findCategoryById(id: number){
    return await prisma.category.findUnique({
        where: { id }
    })
}

export async function findAllCategories(){
    return await prisma.category.findMany();
}
