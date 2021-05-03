import { Request, Response } from 'express';

import { Order } from '../models/order.model';

const findAll = async (req: Request, res: Response) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).exec();

  return res.json({ data: orders });
};

const findOne = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  return res.json({ data: order });
};

export { findAll, findOne };
