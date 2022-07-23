import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import prisma from "../../src/config/database.js";

function generateEmailAndPassword(){
    const [email, password] = ['admintestapp@hotmail.com', faker.internet.password()];
    return {
        email, password
    }
}

async function createUserOfAuthenticatedRoute(){
    const [email, password] = [faker.internet.email(), faker.internet.password()];
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: {
            email, password: encryptedPassword
        }
    });

    return { email, password }
}

const userFactory = {
    generateEmailAndPassword,
    createUserOfAuthenticatedRoute
};

export default userFactory;
