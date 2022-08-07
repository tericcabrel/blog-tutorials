import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

export { prisma, Prisma };
