import { APIGatewayProxyHandler } from 'aws-lambda';
import { Post } from "../models/post.model";
import { connectToDatabase } from "../utils/db-connection";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const posts = await Post.find().sort({ createdAt: -1 });

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ data: posts }),
  };
};
