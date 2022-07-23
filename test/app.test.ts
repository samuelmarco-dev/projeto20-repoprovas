import supertest from "supertest";

import prisma from "../src/config/database.js";
import app from "../src/app.js";

describe("", ()=> {

});

afterAll(async()=> {
    await prisma.$disconnect();
});
