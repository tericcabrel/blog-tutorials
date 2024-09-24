import * as path from "node:path";
import { findOrder } from "../services/find-order";
import { findUser } from "../services/find-user";
import { generateOrderSummary, OrderSummary } from "../utils/email-data-generator";
import { sendEmail } from "../utils/email-client";

export const handleOrderCreated = async (orderId: string) => {
  const order = await findOrder(orderId);

  if (!order) {
    throw new Error(`Order with ID "${orderId}" not found`);
  }

  const user = await findUser(order.user);

  if (!user) {
    throw new Error(`User with ID "${order.user}" not found`);
  }

  const templateData = generateOrderSummary(order, user);
  const templatePath = path.resolve(__dirname, './templates/order-created.html');

  await sendEmail<OrderSummary>({
    subject: 'Your order was created',
    templateData,
    templatePath,
    to: user.email
  });
}
