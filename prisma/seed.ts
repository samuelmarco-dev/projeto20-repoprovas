import prisma from "../src/config/database.js";

async function main(){
    await createTerms();
}
main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});

async function createTerms(){
    await prisma.term.createMany({
        data: [
            { number: 1 }, { number: 2 }, { number: 3 },
            { number: 4 }, { number: 5 }, { number: 6 }
        ]
    });
}
