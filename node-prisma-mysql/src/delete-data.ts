import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tagDeleted = await prisma.tag.delete({
    where: {
      name: 'Iphone',
    },
  });

  console.log(tagDeleted);

  const productsDeleted = await prisma.product.deleteMany({
    where: {
      viewCount: {
        lt: 5,
      },
      visibility: {
        in: ['VISIBLE', 'HIDDEN'],
      },
      OR: {
        isAvailable: false,
      },
    },
  });

  console.log(productsDeleted.count);

  // Delete all products
  await prisma.product.deleteMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
