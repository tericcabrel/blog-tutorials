import { PrismaClient } from '@prisma/client';

(async () => {
  const prismaClient = new PrismaClient({
    log: ['query'],
  });

  try {
    await prismaClient.$connect();

    await prismaClient.user.delete({
      where: {
        id: 2,
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prismaClient.$disconnect();
  }
})();
