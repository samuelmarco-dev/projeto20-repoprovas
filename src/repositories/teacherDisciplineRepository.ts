import prisma from "../config/database";

export async function findTeacherDiscipline(discipline: number, teacher: number){
    return await prisma.teacherDiscipline.findFirst({
        where: {
            disciplineId: discipline,
            teacherId: teacher
        }
    })
}
