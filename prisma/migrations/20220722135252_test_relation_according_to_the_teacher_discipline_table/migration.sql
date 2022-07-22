/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `teachersDisciplines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,categoryId,teacherDisciplineId]` on the table `tests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teachersDisciplines_teacherId_disciplineId_key" ON "teachersDisciplines"("teacherId", "disciplineId");

-- CreateIndex
CREATE UNIQUE INDEX "tests_name_categoryId_teacherDisciplineId_key" ON "tests"("name", "categoryId", "teacherDisciplineId");
