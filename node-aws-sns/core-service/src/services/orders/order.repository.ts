import { Order, OrderInput } from "./order.model";

export const findOrder = async (id: string) => {
  return Order.findOne({ _id: id }).populate('items.product').exec();
}

export const createOrders = async (input: OrderInput[]) => {
  return Order.create(input);
}