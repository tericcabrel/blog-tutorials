import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const usersInput: Prisma.UserCreateManyInput[] = [
    {
      fullName: 'Bob',
      email: 'bob@email.com',
      birthDate: new Date('1995-10-11'),
      password: 'bob-secret',
    },
    {
      fullName: 'Alice',
      email: 'alice@email.com',
      birthDate: new Date('1996-02-10'),
      password: 'alice-secret',
    },
  ];

  await prisma.user.createMany({
    data: usersInput,
  });
};

main().then(async () => {
  await prisma.$disconnect();
});
