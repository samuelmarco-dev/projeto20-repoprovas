import { TestData } from "../schemas/schemaTest.js";
import * as categoryRepository from '../repositories/categoryRepository.js';
import * as disciplineRepository from '../repositories/disciplineRepository.js';
import * as teacherRepository from '../repositories/teacherRepository.js';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository.js';
import * as testRepository from '../repositories/testRepository.js';

type RelationTest = Omit<TestData, "name" | "pdfUrl">

async function createTest(test: TestData){
    const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;
    await checkRelationKeysTest({ categoryId, disciplineId, teacherId });

    const teacherDisciplineFound = await teacherDisciplineRepository.findTeacherDiscipline(disciplineId, teacherId);
    if(!teacherDisciplineFound) throw{
        type: 'TeacherDisciplineNotFound',
        message: 'TeacherDiscipline not found'
    }

    await testRepository.createTest({ name, pdfUrl, categoryId, teacherDisciplineId: teacherDisciplineFound.id });
}

async function checkRelationKeysTest(diceTest: RelationTest){
    const { categoryId, disciplineId, teacherId } = diceTest;

    const categoryFound = await categoryRepository.findCategoryById(categoryId);
    if(!categoryFound) throw{
        type: 'CategoryNotFound',
        message: 'Category not found'
    }

    const disciplineFound = await disciplineRepository.findDisciplineById(disciplineId);
    if(!disciplineFound) throw{
        type: 'DisciplineNotFound',
        message: 'Discipline not found'
    }

    const teacherFound = await teacherRepository.findTeacherById(teacherId);
    if(!teacherFound) throw{
        type: 'TeacherNotFound',
        message: 'Teacher not found'
    }
}

const testService = {
    createTest
}

export default testService;
