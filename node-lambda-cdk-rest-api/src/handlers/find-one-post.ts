import { APIGatewayProxyHandler } from 'aws-lambda';
import { Post } from "../models/post.model";
import { connectToDatabase } from "../utils/db-connection";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const postId = event.pathParameters.id;

  const post = await Post.findOne({ _id: postId });

  if (post) {
    return {
      statusCode: 200,
      headers: {"Content-Type": "text/json"},
      body: JSON.stringify({ data: post }),
    };
  }

  return {
    statusCode: 404,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ message: `No post found with the ID "${postId}"` }),
  };
};