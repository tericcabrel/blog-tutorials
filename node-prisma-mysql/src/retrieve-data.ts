import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tagFound = await prisma.tag.findUnique({
    where: {
      name: 'Iphone',
    },
  });

  console.log(tagFound);

  const category = await prisma.category.findFirst({
    where: {
      products: {
        some: {
          viewCount: {
            gt: 100,
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log(category);

  // Find all tags
  const allTags = await prisma.tag.findMany();

  console.log(allTags);

  // Select a subset of fields
  const partialProduct = await prisma.product.findUnique({
    where: {
      id: 2,
    },
    select: {
      id: true,
      name: true,
      reference: true,
    },
  });

  console.log(partialProduct);

  // Find distinct category
  const distinctCategories = await prisma.category.findMany({
    where: {
      products: {
        some: {
          visibility: {
            notIn: ['VISIBLE', 'FEATURED'],
          },
        },
      },
    },
    distinct: ['name'],
  });

  console.log(distinctCategories);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
