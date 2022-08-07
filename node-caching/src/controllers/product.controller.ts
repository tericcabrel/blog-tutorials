import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { sleep } from '../utils/sleep';
import { redis } from '../utils/redis';
import { Product } from '@prisma/client';
import { buildSearchProductsCacheKey } from '../utils/cache';

type ProductSearchQuery = {
  name: string;
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
  const CACHE_KEY = 'allProducts';
  const rawCachedData = await redis.get(CACHE_KEY);

  if (rawCachedData) {
    const cachedData = JSON.parse(rawCachedData) as Product[];

    return res.json({ data: cachedData });
  }

  await sleep(3000);

  const products = await prisma.product.findMany();

  redis.set(CACHE_KEY, JSON.stringify(products));

  return res.json({ data: products });
};

export const searchProducts = async (req: Request, res: Response) => {
  const { available, category, maxPrice, minPrice, name } = req.query as ProductSearchQuery;

  const cacheKey = buildSearchProductsCacheKey('searchProducts', {
    available,
    category,
    maxPrice,
    minPrice,
    name,
  });

  const rawCachedData = await redis.get(cacheKey);

  if (rawCachedData) {
    const cachedData = JSON.parse(rawCachedData) as Product[];

    return res.json({ data: cachedData });
  }

  await sleep(3000);

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

  redis.set(cacheKey, JSON.stringify(result));

  return res.json({ data: result });
};
