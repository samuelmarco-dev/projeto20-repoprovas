import supertest from "supertest";
import { faker } from "@faker-js/faker";

import prisma from "../src/config/database.js";
import app from "../src/app.js";
import userFactory from "./factories/userFactory.js";
import { generateTest, generateTestOfConflict } from "./factories/testFactory.js";
import { giveBackInvalidToken, giveBackTokenExpired } from "./factories/tokenFactory.js";

beforeAll(async()=> {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("POST /sign-up", ()=> {
    it('no data in test', async()=> {
        const response = await supertest(app).post('/sign-up').send({});
        expect(response.status).toEqual(422);
    });

    it('given password and confirmPassword divergent', async()=> {
        const { email, password } = userFactory.generateEmailAndPassword();

        const response = await supertest(app).post('/sign-up').send({
            email, password, confirmPassword: 'senhadiferente'
        });
        expect(response.status).toEqual(422);
    });

    it('given e-mail, password and confirmPassword, create user', async()=> {
        const { email, password } = userFactory.generateEmailAndPassword();

        const response = await supertest(app).post('/sign-up').send({
            email, password, confirmPassword: password
        });
        expect(response.status).toEqual(201);

        const userCreated = await prisma.user.findUnique({
            where: { email }
        });
        expect(userCreated.email).toEqual(email);
    });

    it('given email, password and confirmPassword report conflict', async()=> {
        const { email, password } = userFactory.generateEmailAndPassword();

        const response = await supertest(app).post('/sign-up').send({
            email, password, confirmPassword: password
        });
        expect(response.status).toEqual(409);
    });
});

describe("POST /sign-in", ()=> {
    it('no data in test', async()=> {
        const response = await supertest(app).post('/sign-in').send({});
        expect(response.status).toEqual(422);
    });

    it('given email and password from an unregistered user', async()=> {
        const { password } = userFactory.generateEmailAndPassword();

        const response = await supertest(app).post('/sign-in').send({
            email: 'emailfalso@hotmail.com', password
        });
        expect(response.status).toEqual(404);
    });

    it('given email and password, receive token', async()=> {
        const { email } = userFactory.generateEmailAndPassword();
        const user = await prisma.user.findUnique({
            where: { email }
        });

        const response = await supertest(app).post('/sign-in').send({
            email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();
    });

    it('given a registered user, try to login with incorrect password', async()=> {
        const { email } = userFactory.generateEmailAndPassword();

        const response = await supertest(app).post('/sign-in').send({
            email, password: 'umasenhainválida'
        });
        expect(response.status).toEqual(401);
    });
});

describe("POST /test", ()=> {
    it('create test with valid token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();
        const test = generateTest();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).post('/test').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(201);
    });

    it('given existing test, report conflict', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();
        const test = await generateTestOfConflict();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).post('/test').send({
            name: 'TrackIt',
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            disciplineId: 3,
            teacherId: 1
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(409);
    });

    it('create test with user expired token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();
        const test = generateTest();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = giveBackTokenExpired();
        expect(token.token).not.toBeNull();

        response = await supertest(app).post('/test').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(401);
    });

    it('create test with user invalid token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();
        const test = generateTest();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = giveBackInvalidToken();
        expect(token.token).not.toBeNull();

        response = await supertest(app).post('/test').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(401);
    });

    it('create test with categoryId not registered', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();
        const test = generateTest();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).post('/test').send({ ...test, categoryId: 99 }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(404);
    });

    it('create test with disciplineId not registered', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();
        const test = generateTest();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).post('/test').send({ ...test, disciplineId: 99 }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(404);
    });

    it('create test with teacherId not registered', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();
        const test = generateTest();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).post('/test').send({ ...test, teacherId: 99 }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(404);
    });
});

describe("GET /tests?groupBy", ()=> {
    it('visualization of tests without parameter', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).get('/tests').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(400);
    });

    it('visualization of tests separated by discipline with valid token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).get('/tests?groupBy=disciplines').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });

    it('visualization of tests separated by teacher with valid token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).get('/tests?groupBy=teachers').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });

    it('visualization of tests with expired token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = giveBackTokenExpired();
        expect(token.token).not.toBeNull();

        response = await supertest(app).get('/tests?groupBy=disciplines').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(401);
    });

    it('visualization of tests with invalid token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = giveBackInvalidToken();
        expect(token.token).not.toBeNull();

        response = await supertest(app).get('/tests?groupBy=disciplines').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(401);
    });
});

describe("GET /categories", ()=> {
    it('visualization of categories with valid token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = response.body.token;
        expect(token).not.toBeNull();

        response = await supertest(app).get('/categories').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });

    it('visualization of categories with expired token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = giveBackTokenExpired();
        expect(token.token).not.toBeNull();

        response = await supertest(app).get('/categories').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(401);
    });

    it('visualization of categories with invalid token', async()=> {
        const user = await userFactory.createUserOfAuthenticatedRoute();

        let response = await supertest(app).post('/sign-in').send({
            email: user.email, password: user.password
        });
        const token = giveBackInvalidToken();
        expect(token.token).not.toBeNull();

        response = await supertest(app).get('/categories').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(401);
    });
})

afterAll(async()=> {
    const test = {
        name: 'TrackIt',
        categoryId: 1,
        teacherDisciplineId: 3
    }
    await prisma.$executeRaw`
        DELETE FROM "tests" WHERE "name"= ${test.name};
    `;
    await prisma.$disconnect();
});
