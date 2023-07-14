// Execute: npx ts-node util/init-db.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.project.deleteMany();
    await prisma.subproject.deleteMany();
    await prisma.user.deleteMany();
    await prisma.asset.deleteMany();
    await prisma.trailer.deleteMany();
    
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
