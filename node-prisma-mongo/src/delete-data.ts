import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteData = async () => {
  await prisma.user.delete({
    where: {
      id: '62b820aa61db43300409d96a',
    },
  });

  /*await prisma.user.delete({
    where: {
      email: 'jon.snow@got.com',
    },
  });

  // Delete all the posts of an author
  await prisma.post.deleteMany({
    where: {
      authorId: '601e6711225a273142039d2a',
    },
  });

  // Delete all posts where the title content "how to"
  await prisma.post.deleteMany({
    where: {
      title: {
        contains: 'how to',
      },
    },
  });*/
};

deleteData().then();
