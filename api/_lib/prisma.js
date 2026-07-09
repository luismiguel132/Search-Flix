import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/index.js';

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionString = process.env.SEARCHFLIX_PRISMA_DATABASE_URL;

  if (!connectionString) {
    throw new Error('SEARCHFLIX_PRISMA_DATABASE_URL não configurada');
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
