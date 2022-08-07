import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const CATEGORY_PHONE = 'Phone';
const CATEGORY_COMPUTER = 'Computer';
const CATEGORY_TV = 'TV';
const CATEGORY_GAME = 'Game';
const CATEGORY_TABLET = 'Tablet';

type Data = {
  categoryName: string;
  products: Array<{
    name: string;
    description: string | null;
    price: number;
    isAvailable: boolean;
  }>;
};

const data: Data[] = [
  {
    categoryName: CATEGORY_COMPUTER,
    products: [
      { name: 'Macbook Pro 2022 14 Inch', description: 'Product Description 1', price: 2279, isAvailable: true },
      { name: 'Macbook Air 2022 13 Inch', description: 'Product Description  2', price: 1849, isAvailable: true },
      { name: 'Zenbook 14 Flip OLED (UP5401, 11th Gen Intel)', description: 'Product Description 3', price: 1499, isAvailable: false },
      { name: 'MSI Titan GT77 12UGS-043FR', description: 'Product Description 4', price: 3899, isAvailable: true },
      { name: 'Alienware x15 R2', description: 'Product Description 5', price: 2189, isAvailable: false },
      { name: 'Macbook Pro 2021 16 inch', description: 'Product Description 6', price: 2179, isAvailable: true },
    ],
  },
  {
    categoryName: CATEGORY_GAME,
    products: [
      { name: 'Xbox Series X', description: 'Product Description 7', price: 682, isAvailable: true },
      { name: 'Xbox Series S', description: 'Product Description 8', price: 559, isAvailable: true },
      { name: 'PlayStation 5', description: 'Product Description 9', price: 589, isAvailable: false },
      { name: 'PlayStation 4 Pro', description: 'Product Description 10', price: 499, isAvailable: false },
      { name: 'Nintendo Switch', description: 'Product Description 11', price: 310, isAvailable: true },
      { name: 'Xbox Series One', description: 'Product Description 12', price: 376, isAvailable: true },
    ],
  },
  {
    categoryName: CATEGORY_PHONE,
    products: [
      { name: 'Apple Iphone 13', description: 'Product Description 13', price: 849, isAvailable: true },
      { name: 'Apple Iphone XS Max', description: 'Product Description 14', price: 699, isAvailable: true },
      { name: 'Xiaomi Redmi Note 11 Pro 5G', description: 'Product Description 15', price: 599, isAvailable: true },
      { name: 'Samsung Galaxy S22', description: 'Product Description 16', price: 799, isAvailable: false },
      { name: 'Google - Pixel 4a 5G', description: 'Product Description 17', price: 451, isAvailable: true },
      { name: 'HUAWEI P30 Pro 256 Silver Frost', description: 'Product Description 18', price: 750, isAvailable: true },
      { name: 'OPPO Find X3 Neo', description: 'Product Description 19', price: 599, isAvailable: false },
      { name: 'Apple Iphone SE 2020', description: 'Product Description 20', price: 429, isAvailable: true },
    ],
  },
  {
    categoryName: CATEGORY_TABLET,
    products: [
      { name: 'Samsung Galaxy Tab A8 10.5 Inch', description: 'Product Description 21', price: 179, isAvailable: true },
      { name: '2021 Apple iPad Pro 12.9 Inch', description: 'Product Description 22', price: 1179, isAvailable: true },
      { name: 'Lenovo Tab P11 Plus', description: 'Product Description 23', price: 269, isAvailable: false },
      { name: 'Xiaomi Pad 5 6+256 Black', description: 'Product Description 24', price: 369, isAvailable: true },
      { name: '2022 Apple iPad Air', description: 'Product Description 25', price: 1024, isAvailable: true },
      { name: '2021 Apple iPad mini', description: 'Product Description 26', price: 786, isAvailable: false },
    ],
  },
  {
    categoryName: CATEGORY_TV,
    products: [
      { name: 'Sony BRAVIA KD55X80J 55 Inch', description: 'Product Description 27', price: 586, isAvailable: true },
      { name: 'Xiaomi Smart TV P1E 55 Inch', description: 'Product Description 28', price: 399, isAvailable: false },
      { name: 'SAMSUNG UE43TU7095 TV LED UHD 4K 43 Inch', description: 'Product Description 29', price: 399, isAvailable: true },
      { name: 'HYUNDAI TV LED 32 Inch', description: 'Product Description 30', price: 150, isAvailable: false },
      { name: 'Samsung UE55AU7172UXXH Smart TV 55 Inch', description: 'Product Description 31', price: 496, isAvailable: true },
      { name: 'Hisense 43AE7000F TV LED 43 Inch', description: 'Product Description 32', price: 349, isAvailable: true },
    ],
  },
];

const loadProducts = () => {
  const promises = data.map(async (item) => {
    const category = await prisma.category.findUnique({ where: { name: item.categoryName } });
    const categoryCreated = category ?? (await prisma.category.create({ data: { name: item.categoryName } }));

    const productsInput = item.products.map((product) => ({
      ...product,
      categoryId: categoryCreated.id,
    }));

    await prisma.product.createMany({
      data: productsInput,
      skipDuplicates: true,
    });
  });

  return Promise.all(promises);
};

async function main() {
  await loadProducts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
