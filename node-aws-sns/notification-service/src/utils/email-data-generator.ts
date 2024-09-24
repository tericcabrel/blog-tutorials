import { Order } from "../services/find-order";
import { User } from "../services/find-user";

export type OrderSummary = {
  orderId: string;
  orderDate: string;
  reference: string;
  total: number;
  subTotal: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  vat: number;
  vatAmount: number;
  userName: string;
};

export const generateOrderSummary = (order: Order, user: User): OrderSummary => {
  const items = order.items.map(item => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.unitPrice,
  }));

  const subTotal = order.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const vatAmount = Math.round(subTotal * (order.vatRate / 100) * 100) / 100;

  return {
    orderId: order._id,
    orderDate: order.createdAt,
    reference: order.reference,
    total: subTotal + vatAmount,
    subTotal,
    items,
    vat: order.vatRate,
    vatAmount,
    userName: user.name,
  };
}