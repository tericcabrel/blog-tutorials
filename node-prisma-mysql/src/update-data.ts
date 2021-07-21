import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categoriesUpdated = await prisma.category.updateMany({
    where: {
      name: {
        contains: 'Iphone',
      },
    },
    data: {
      name: 'Apple Iphone',
    },
  });

  console.log(categoriesUpdated.count); // 2

  const productUpdated = await prisma.product.update({
    where: {
      id: 2,
    },
    data: {
      viewCount: 20,
      isAvailable: true,
      visibility: 'DEAL',
    },
    include: {
      category: true,
    },
  });

  console.log(productUpdated);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
