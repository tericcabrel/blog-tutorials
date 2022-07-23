import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const main = async () => {
  const movieAvatar = await prisma.movie.findUniqueOrThrow({ where: { name: 'Avatar' } });
  const userBob = await prisma.user.findUniqueOrThrow({ where: { email: 'bob@email.com' } });

  // Delete 'Avatar' rating made by Bob
  await prisma.movieRating.delete({
    where: {
      movieId_userId: {
        movieId: movieAvatar.id,
        userId: userBob.id,
      },
    },
  });

  // Delete all the ratings for the movie 'Avatar'
  await prisma.movieRating.deleteMany({
    where: {
      movieId: movieAvatar.id,
    },
  });
};

main().then();
