import { Request, Response } from 'express';

import { Order } from '../models/order.model';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

const findAll = async (req: Request, res: Response) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).exec();

  return res.json({ data: orders });
};

const findOne = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  return res.json({ data: order });
};

const viewOrder = async (req: Request, res: Response) => {
  const order = await Order.findOne({ _id: req.params.id })
    .populate({ path: 'user', model: User })
    .populate({ path: 'shippingAddress', model: Address })
    .populate({ path: 'billingAddress', model: Address })
    .exec();

  res.render('invoice', { order: order?.toJSON() });
};

export { findAll, findOne, viewOrder };
