import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { sleep } from '../utils/sleep';

type ProductSearchQuery = {
  name?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  available?: string;
};

export const createProduct = async (req: Request, res: Response) => {
  const { categoryId, description, isAvailable, name, price } = req.body;

  const product = await prisma.product.create({
    data: {
      categoryId,
      description,
      name,
      price,
      isAvailable,
    },
  });

  return res.json({ data: product });
};

export const findAllProducts = async (req: Request, res: Response) => {
  await sleep(3000);

  const products = await prisma.product.findMany();

  return res.json({ data: products });
};

export const searchProducts = async (req: Request, res: Response) => {
  await sleep(3000);

  const { available, category, maxPrice, minPrice, name } = req.query as ProductSearchQuery;

  const result = await prisma.product.findMany({
    where: {
      category: category ? { name: category } : undefined,
      isAvailable: available !== undefined ? available === 'yes' : undefined,
      name: name ? { contains: name } : undefined,
      price: {
        gt: minPrice !== undefined ? +minPrice : undefined,
        lt: maxPrice !== undefined ? +maxPrice : undefined,
      },
    },
  });

  return res.json({ data: result });
};
