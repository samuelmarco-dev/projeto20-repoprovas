import { RelationTest } from "../services/testService.js";

export default function verifyBodyInRequest(data: RelationTest){
    const { categoryId, disciplineId, teacherId } = data;

    if(typeof categoryId !== 'number' || typeof disciplineId !== 'number' || typeof teacherId !== 'number') return false;
    return true;
}
