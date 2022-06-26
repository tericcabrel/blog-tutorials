import { PrismaClient, Tag } from '@prisma/client';

const prisma = new PrismaClient();

export const retrieveData = async () => {
  // Find all users
  const allUsers = await prisma.user.findMany();

  // Find a user by his Id
  const [user] = allUsers;
  const userById = await prisma.user.findUnique({ where: { id: user.id } });

  // Find a user by his email
  const userByEmail = await prisma.user.findFirst({ where: { email: user.email } });

  // Find a user by his email and return only his email and the name
  const partialUserByEmail = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      email: true,
      name: true,
    },
  });
  // console.log(partialUserByEmail);

  // Find user living in France order by creation date Descending
  const users = await prisma.user.findMany({
    where: {
      location: {
        some: {
          country: 'FRA',
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  // console.log(users);

  const [firstUser] = users;
  // Find all post of a user and also fetch the author data (.populate('author'))
  const allUserPosts = await prisma.post.findMany({
    where: {
      authorId: firstUser.id,
    },
    include: {
      author: true,
    },
  });
  // console.log(allUserPosts);

  // Find all post of a user and also fetch the author data but only his name
  const allUserPostsWithPartialAuthor = await prisma.post.findMany({
    where: {
      authorId: firstUser.id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  // console.log(allUserPostsWithPartialAuthor);

  // Find published post with viewCount greater than 20 order by creation date Ascending
  const ascPosts = await prisma.post.findMany({
    where: {
      isPublished: true,
      viewCount: {
        gt: 20,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Find post with tags containing Node and Docker and viewCount Greater than between 20 and 30
  const postsWithTags = await prisma.post.findMany({
    where: {
      tags: {
        hasSome: [Tag.NodeJS, Tag.Docker],
      },
      viewCount: {
        gte: 20,
        lte: 30,
      },
    },
  });
};

retrieveData().then();
