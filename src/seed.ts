import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const seedDb = async () => {
  const companies = [];
  const locations = [];
  const addresses = [];
  const responsibles = [];

  for (let i = 1; i <= 10; i++) {
    companies.push({
      id: i,
      name: faker.company.name(),
      cnpj: faker.random.numeric(14),
      description: faker.lorem.words(),
    });

    addresses.push({
      id: i,
      city: faker.address.city(),
      district: faker.address.county(),
      number: faker.address.buildingNumber(),
      state: faker.address.state(),
      street: faker.address.street(),
      zipcode: faker.address.zipCode('########'),
    });

    locations.push({
      id: i,
      name: faker.random.word(),
      addressId: i,
      companyId: i,
    });

    responsibles.push({
      id: i,
      name: faker.name.fullName(),
      phone: faker.phone.number(),
      cpf: faker.random.numeric(11),
      companyId: i,
      addressId: i,
      locationId: i,
    });
  }

  await prisma.companies.createMany({
    data: companies,
  });

  await prisma.addresses.createMany({
    data: addresses,
  });

  await prisma.locations.createMany({
    data: locations,
  });

  await prisma.responsibles.createMany({
    data: responsibles,
  });
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
