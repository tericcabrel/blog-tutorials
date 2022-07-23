import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const main = async () => {
  // Retrieve all ratings
  await prisma.movieRating.findMany();

  // Find rating with a rate greater or equal to 5
  await prisma.movieRating.findMany({
    where: {
      rate: {
        gte: 5,
      },
    },
  });

  // Calculate overall average movie rating
  await prisma.movieRating.aggregate({
    _avg: {
      rate: true,
    },
  });

  // Get the average rate of the movie Gladiator
  const movieGladiator = await prisma.movie.findUniqueOrThrow({ where: { name: 'Gladiator' } });

  await prisma.movieRating.aggregate({
    _avg: {
      rate: true,
    },
    where: {
      movieId: movieGladiator.id,
    },
  });
};

main().then();
