import * as categoryRepository from '../repositories/categoryRepository.js';

async function findManyCategories(){
    const categories = await categoryRepository.findAllCategories();
    return categories;
}

const categoryService = {
    findManyCategories
}

export default categoryService;
