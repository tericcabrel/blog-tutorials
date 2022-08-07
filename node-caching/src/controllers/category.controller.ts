import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: { name },
  });

  return res.json({ data: category });
};

export const findAllCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  return res.json({ data: categories });
};
