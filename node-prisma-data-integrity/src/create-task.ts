import { PrismaClient, TaskStatus } from '@prisma/client';

(async () => {
  const prismaClient = new PrismaClient({
    log: ['query'],
  });

  try {
    await prismaClient.$connect();

    await prismaClient.task.create({
      data: {
        name: 'Task One',
        description: 'Description of task one',
        dueDate: new Date(2023, 4, 31),
        status: TaskStatus.PENDING,
        owner: {
          connect: {
            id: 2,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prismaClient.$disconnect();
  }
})();
