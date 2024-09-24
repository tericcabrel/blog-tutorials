import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from "../utils/db";
import { handleProcessOrder, validateInput } from "../services/orders/process-order";
import { OrderEvent } from "../types/events";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"

const snsClient = new SNSClient({ region: process.env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event, context) => {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const payload = JSON.parse(event.body ?? '{}');

  const validationResult = validateInput(payload);

  if (validationResult.success) {
    const processResult = await handleProcessOrder(validationResult.data);

    if (!processResult.success) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "text/json" },
        body: JSON.stringify(processResult.error),
      };
    }

    const snsPayload: OrderEvent = {
      type: 'order.created',
      payload: {
        orderId: processResult.data.orderId,
      }
    };

    const publishCommand = new PublishCommand({
      TopicArn: process.env.ORDER_EVENTS_TOPIC_ARN,
      Message: JSON.stringify(snsPayload),
    });

    await snsClient.send(publishCommand);

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(processResult.data),
    };
  } else {
    return {
      statusCode: 400,
      headers: { "Content-Type": "text/json" },
      // @ts-ignore
      body: JSON.stringify({ message: "Invalid input data", errors: validationResult.error }),
    };
  }
};
