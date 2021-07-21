import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const insertResult = await prisma.tag.createMany({
    data: [{ name: 'Television' }, { name: 'Radio' }, { name: 'Printer' }],
  });

  console.log(insertResult.count); // 3

  const productCreated = await prisma.product.create({
    data: {
      name: 'Smart TV Full HD 40 Inch',
      slug: 'smart-tv-full-hd-40-inch',
      isAvailable: true,
      price: 455,
      extras: {
        width: 168,
        height: 109,
        energy: 'Class A+',
      },
      pictures: {
        'picture_one.png': 'picture_one_storage_path',
        'picture_two.png': 'picture_two_storage_path',
      },
      categoryId: 1, // Exist in the database from the seed
    },
  });

  console.log(productCreated);

  const productWithTagsCreated = await prisma.product.create({
    data: {
      name: 'Macbook Pro 2020 16 Inch',
      slug: 'macbook-pro-2020-16-inch',
      isAvailable: true,
      price: 2799,
      extras: {
        storage: '512GB',
        memory: '16GB',
        hasThunderbolt: true,
        osVersion: 11.2,
      },
      visibility: 'FEATURED',
      pictures: {
        'picture_one.png': 'picture_one_storage_path',
        'picture_two.png': 'picture_two_storage_path',
      },
      categoryId: 1,
      productTags: {
        createMany: {
          data: [{ tagId: 1 }, { tagId: 2 }],
        },
      },
    },
    include: {
      productTags: true, // include product tags in the object returned
      category: true, // also include category
    },
  });

  console.log(productWithTagsCreated);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
