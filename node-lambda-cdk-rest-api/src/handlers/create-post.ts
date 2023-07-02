import mongoose from 'mongoose';
import { z } from 'zod';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Post, PostInput, PostStatusEnum } from "../models/post.model";
import { connectToDatabase } from "../utils/db-connection";

const createPostBodySchema = z.object({
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

type CreatePostBodyInput = z.infer<typeof createPostBodySchema>;

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const payload = JSON.parse(event.body ?? '{}');

  const validationResult = createPostBodySchema.safeParse(payload);

  if (validationResult.success) {
    const { data } = validationResult;
    const postInput: PostInput = {
      author: new mongoose.Types.ObjectId(data.authorId),
      content: data.content,
      title: data.title,
      isFeatured: data.isFeatured,
      tags: data.tags,
      status: data.status,
      slug: data.title.toLowerCase().replace(/ /gm, '-'),
    };

    const [createdPost] = await Post.create([postInput]);

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(createdPost),
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
