import { TestData } from "../schemas/schemaTest.js";
import * as categoryRepository from '../repositories/categoryRepository.js';
import * as disciplineRepository from '../repositories/disciplineRepository.js';
import * as teacherRepository from '../repositories/teacherRepository.js';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository.js';
import * as testRepository from '../repositories/testRepository.js';

export type RelationTest = Omit<TestData, "name" | "pdfUrl">
export interface TestUnique {
    name: string;
    teacherDisciplineId: number;
    categoryId: number;
}

async function createTest(test: TestData){
    const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;
    await checkRelationKeysTest({ categoryId, disciplineId, teacherId });

    const teacherDisciplineFound = await teacherDisciplineRepository.findTeacherDiscipline(disciplineId, teacherId);
    if(!teacherDisciplineFound) throw{
        type: 'TeacherDisciplineNotFound',
        message: 'TeacherDiscipline not found'
    }

    await findTestExistOrNot({ categoryId, teacherDisciplineId: teacherDisciplineFound.id, name });
    await testRepository.createTest({ name, pdfUrl, categoryId, teacherDisciplineId: teacherDisciplineFound.id });
}

async function checkRelationKeysTest(diceTest: RelationTest){
    const { categoryId, disciplineId, teacherId } = diceTest;
    if(!categoryId || !disciplineId || !teacherId) throw{
        type: 'MissingData',
        message: 'Missing data'
    }

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

async function findTestExistOrNot(test: TestUnique){
    const { categoryId, teacherDisciplineId, name } = test;
    if(!categoryId || !teacherDisciplineId || !name) throw{
        type: 'MissingData',
        message: 'Missing data'
    }

    const testExist = await testRepository.findRelationUnique({ categoryId, teacherDisciplineId, name });
    if(testExist) throw{
        type: 'TestAlreadyExist',
        message: 'Test already exist'
    }
}

async function getTestsDiscipline(){
    return await testRepository.findTestsDiscipline();
}

async function getTestsTeacher(){
    return await testRepository.findTestsTeacher();
}

const testService = {
    createTest,
    getTestsDiscipline,
    getTestsTeacher
}

export default testService;
