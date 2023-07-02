import { APIGatewayProxyHandler } from 'aws-lambda';
import { z } from "zod";
import { Post, PostStatusEnum, UpdatePostInput } from "../models/post.model";
import { connectToDatabase } from "../utils/db-connection";

const updatePostBodySchema = z.object({
  authorId: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).min(1),
  isFeatured: z.boolean(),
  status: z.enum([
    PostStatusEnum.draft,
    PostStatusEnum.published,
    PostStatusEnum.archived
  ]),
});
export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const payload = JSON.parse(event.body ?? '{}');

  const validationResult = updatePostBodySchema.safeParse(payload);

  if (!validationResult.success) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "text/json" },
      // @ts-ignore
      body: JSON.stringify({ message: "Invalid input data", errors: validationResult.error }),
    };
  }

  const { data } = validationResult;

  await connectToDatabase();

  const postId = event.pathParameters.id;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify({ message: `No post found with the ID "${postId}"` }),
    };
  }

  if (!post.author.equals(data.authorId)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify({ message: `Only the author can edit the post` }),
    };
  }

  const postInput: UpdatePostInput = {
    content: data.content,
    title: data.title,
    isFeatured: data.isFeatured,
    tags: data.tags,
    status: data.status,
    slug: data.title.toLowerCase().replace(/ /gm, '-'),
  };

  await Post.updateOne({ _id: postId }, postInput);

  const updatedPost = await Post.findById(postId);

  return {
    statusCode: 200,
    headers: {"Content-Type": "text/json"},
    body: JSON.stringify({ data: updatedPost }),
  };
};