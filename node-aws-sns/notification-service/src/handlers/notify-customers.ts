import { SNSHandler } from "aws-lambda";
import { OrderEvent } from "../types/events";
import { handleOrderCreated } from "../event-handlers/order-created";

export const handler: SNSHandler = async (event) => {
  const [record] = event.Records;
  const orderEvent = JSON.parse(record.Sns.Message) as OrderEvent;

  console.log("Sending notifications to customers...", orderEvent);

  switch (orderEvent.type) {
    case 'order.created':
      return handleOrderCreated(orderEvent.payload.orderId);
    case 'order.shipped':
    case "order.cancelled":
      console.log('To be implemented');
    default:
      console.error(`Unsupported event type: ${orderEvent.type}`);
      break;
  }
};
