import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import prisma from "../../src/config/database.js";

function generateEmailAndPassword(){
    const [email, password] = ['admintestapp@hotmail.com', faker.internet.password()];
    return {
        email, password
    }
}

const userFactory = {
    generateEmailAndPassword
};

export default userFactory;
