import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import path from 'path';

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

  // @ts-ignore
  const subTotal = order.totalAmount - (order.shippingAmount + order.taxAmount);

  res.render('invoice', { order: order?.toJSON(), orderSubTotal: subTotal });
};

const downloadOrder = async (req: Request, res: Response) => {
  const order = await Order.findOne({ _id: req.params.id });

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const url = `${baseUrl}/orders/${req.params.id}/view`;

  const filePath = path.resolve(__dirname, `../../public/ORDER-${order?.reference}.pdf`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.pdf({ path: filePath, format: 'a4', printBackground: true });
  await browser.close();

  res.download(filePath);
};

export { findAll, findOne, viewOrder, downloadOrder };
