import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedDb = async () => {
  await prisma.responsibles.deleteMany({});
  await prisma.tickets.deleteMany({});
  await prisma.locations.deleteMany({});
  await prisma.addresses.deleteMany({});
  await prisma.companies.deleteMany({});
};

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
