import { Tag, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateData = async () => {
  const [firstUser] = await prisma.user.findMany();

  const updatedUser = await prisma.user.update({
    where: {
      id: firstUser.id,
    },
    data: {
      location: {
        set: {
          address: '',
          country: 'US',
          city: 'San Francisco',
        },
      },
    },
  });

  console.log(updatedUser);

  const [userPost] = await prisma.post.findMany({
    where: {
      authorId: firstUser.id,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: userPost.id,
    },
    data: {
      isPublished: true,
      tags: [Tag.GraphQL, Tag.AWS, Tag.Jest],
    },
  });

  console.log(updatedPost);
};

updateData().then();
