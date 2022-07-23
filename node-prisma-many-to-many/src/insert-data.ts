import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const main = async () => {
  const movieGladiator = await prisma.movie.findUniqueOrThrow({ where: { name: 'Gladiator' } });
  const movieAvenger = await prisma.movie.findUniqueOrThrow({ where: { name: 'Avengers' } });
  const movieAvatar = await prisma.movie.findUniqueOrThrow({ where: { name: 'Avatar' } });
  const userBob = await prisma.user.findUniqueOrThrow({ where: { email: 'bob@email.com' } });
  const userAlice = await prisma.user.findUniqueOrThrow({ where: { email: 'alice@email.com' } });

  await prisma.movieRating.create({
    data: {
      movieId: movieGladiator.id,
      userId: userBob.id,
      rate: 9,
      review: 'I was expecting a better ending.',
      addedAt: new Date(2022, 6, 10),
    },
  });

  await prisma.movieRating.createMany({
    data: [
      { movieId: movieAvenger.id, userId: userAlice.id, rate: 4, review: 'Boring', addedAt: new Date(2022, 6, 11) },
      { movieId: movieAvatar.id, userId: userBob.id, rate: 8, review: 'Good movie', addedAt: new Date(2022, 6, 13) },
      { movieId: movieGladiator.id, userId: userAlice.id, rate: 7, review: 'Hard to follow', addedAt: new Date(2022, 6, 14) },
    ],
  });
};

main().then();
