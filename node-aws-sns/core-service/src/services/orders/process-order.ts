import mongoose from 'mongoose';
import { z } from 'zod';
import { OrderInput, OrderStatusEnum, PaymentStatusEnum } from './order.model';
import { areProductExist } from "../products/product.repository";
import { createOrders } from "./order.repository";

const processOrderBodySchema = z.object({
  userId: z.string(),
  products: z.array(
    z.object({
      id: z.string(),
      unitPrice: z.number().nonnegative(),
      quantity: z.number().int().gte(1),
    })
  ).min(1),
  vatRate: z.number().optional(),
});

type ProcessOrderBodyInput = z.infer<typeof processOrderBodySchema>;

export const validateInput = (input: unknown) => {
  return processOrderBodySchema.safeParse(input);
};

const calculateOrderAmount = (products: ProcessOrderBodyInput['products'], vatRate: number = 0) => {
  const amount = products.reduce((total, product) => {
    return total + (product.unitPrice * product.quantity);
  }, 0);

  const vatAmount = (amount * vatRate) / 100;

  return amount + vatAmount;
}

export const handleProcessOrder = async (input: ProcessOrderBodyInput) => {
  const { products, userId, vatRate } = input;
  const areProductInOrderExist = await areProductExist(products.map(p => p.id));

  if (!areProductInOrderExist) {
    return {
      success: false,
      error: { message: `Some products between the IDs [${products.map(p => p.id).join(', ')}] doesn't exists.` }
    };
  }

  const orderAmount = calculateOrderAmount(products, vatRate);

  const orderInput: OrderInput = {
    amount: orderAmount,
    vatRate: vatRate ?? 0,
    user: new mongoose.Types.ObjectId(userId),
    status: OrderStatusEnum.CREATED,
    reference: Math.random().toString(),
    payment: {
      amount: orderAmount,
      reference: Math.random().toString(),
      status: PaymentStatusEnum.SUCCEEDED,
    },
    items: products.map((product) => ({
      product: new mongoose.Types.ObjectId(product.id),
      unitPrice: product.unitPrice,
      quantity: product.quantity,
    }))
  };

  const [createdOrder] = await createOrders([orderInput]);

  return { success: true, data: { orderId: createdOrder._id } };
};