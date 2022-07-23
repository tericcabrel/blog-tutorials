import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const loadMovies = async () => {
  const moviesInput: Prisma.MovieCreateManyInput[] = [
    { name: 'Avatar', releaseDate: new Date(2009, 11, 16) },
    {
      description: "A soldier try to revenge his family's death",
      name: 'Gladiator',
      releaseDate: new Date(2000, 5, 20),
    },
    {
      description: 'Our here united to save the world',
      name: 'Avengers',
      releaseDate: new Date(2012, 3, 25),
    },
  ];

  await prisma.movie.createMany({
    data: moviesInput,
  });
};

const loadUsers = async () => {
  const usersInput: Prisma.UserCreateManyInput[] = [
    { name: 'Bob', email: 'bob@email.com' },
    { name: 'Alice', email: 'alice@email.com' },
  ];

  await prisma.user.createMany({
    data: usersInput,
  });
};

const main = async () => {
  await loadUsers();

  await loadMovies();
};

main().then();
