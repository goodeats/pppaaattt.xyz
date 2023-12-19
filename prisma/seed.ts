import { PrismaClient } from '@prisma/client';
import { seedDesignAttributes, seedLayers } from './seed-create';
const prisma = new PrismaClient();

const resetDb = async () => {
  console.log('Resetting database...');
  await prisma.layer.deleteMany();
  await prisma.designAttribute.deleteMany();
  await prisma.inputParameter.deleteMany();
  console.log('Database reset.');
};

const seedTables = async () => {
  console.log('Seeding tables...');
  await seedLayers();
  await seedDesignAttributes();
  console.log('Tables seeded.');
};

async function main() {
  console.log('Start seeding...');

  await resetDb();
  await seedTables();

  console.log('Seeding complete.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
