import { PrismaClient } from '@prisma/client';

(async () => {
  const { randomBytes } = await import('crypto');

  const prismaClient = new PrismaClient();

  try {
    await prismaClient.$connect();

    await prismaClient.user.createMany({
      data: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          password: randomBytes(10).toString('hex'),
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@email.com',
          password: randomBytes(10).toString('hex'),
        },
      ],
      skipDuplicates: true,
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prismaClient.$disconnect();
  }
})();
