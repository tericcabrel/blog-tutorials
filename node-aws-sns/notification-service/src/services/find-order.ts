import { z } from 'zod';
import { isAxiosError } from "axios";
import { httpClient } from "../utils/http-client";

const orderResponseSchema = z.object({
  _id: z.string(),
  reference: z.string(),
  status: z.string(),
  amount: z.number(),
  vatRate: z.number(),
  user: z.string(),
  payment: z.object({
    reference: z.string(),
    status: z.string(),
    amount: z.number(),
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  items: z.array(z.object({
    product: z.object({
      _id: z.string(),
      name: z.string(),
      reference: z.string(),
      inStock: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
      __v: z.number(),
    }),
    quantity: z.number(),
    unitPrice: z.number(),
    _id: z.string(),
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type Order = z.infer<typeof orderResponseSchema>;

export const findOrder = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await httpClient.get(`/orders/${orderId}`);

    return orderResponseSchema.parse(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Failed to retrieve order', error.response?.data);
    }

    if (error instanceof z.ZodError) {
      console.error('Failed to parse order response', error.errors);
    }

    console.error('Unknown error', error);
  }

  return null;
}