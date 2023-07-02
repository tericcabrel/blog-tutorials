import { APIGatewayProxyHandler } from 'aws-lambda';
import { Post } from "../models/post.model";
import { connectToDatabase } from "../utils/db-connection";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const postId = event.pathParameters.id;

  await Post.deleteOne({ _id: postId });

  return {
    statusCode: 204,
    headers: {"Content-Type": "text/json"},
    body: undefined,
  };
};