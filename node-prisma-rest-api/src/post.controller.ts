import { PostStatus } from '@prisma/client';
import { Request, Response } from 'express';
import * as y from 'yup';

import { prismaClient } from './database';

const createPostBodySchema = y.object({
  authorId: y.number().required(),
  title: y.string().required(),
  content: y.string().required(),
  isFeatured: y.boolean(),
  status: y.string().oneOf([PostStatus.draft, PostStatus.published, PostStatus.archived]),
});

const updatePostBodySchema = y.object({
  authorId: y.number().required(),
  title: y.string().required(),
  content: y.string().required(),
  isFeatured: y.boolean(),
  status: y.string().oneOf([PostStatus.draft, PostStatus.published, PostStatus.archived]),
});

export const createPost = async (req: Request, res: Response) => {
  try {
    const payload = createPostBodySchema.validateSync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const post = await prismaClient.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        isFeatured: payload.isFeatured,
        slug: payload.title.toLowerCase().replace(/ /g, '-'),
        status: payload.status,
        userId: payload.authorId,
      },
    });

    return res.json({ data: post });
  } catch (e) {
    const error = e as y.ValidationError;

    return res.status(422).json({ errors: error.errors });
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  const posts = await prismaClient.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.json({ data: posts });
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await prismaClient.post.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!post) {
    return res.status(404).json({ message: `Post with id "${id}" not found.` });
  }

  return res.json({ data: post });
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const payload = updatePostBodySchema.validateSync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const post = await prismaClient.post.findFirstOrThrow({ where: { id: parseInt(id, 10) } });

    if (!post) {
      return res.status(404).json({ message: `Post with id "${id}" not found.` });
    }

    if (post.userId !== payload.authorId) {
      return res.status(403).json({ message: 'Only the author can edit the post.' });
    }

    const updatedPost = await prismaClient.post.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        title: payload.title,
        content: payload.content,
        isFeatured: payload.isFeatured,
        slug: payload.title.toLowerCase().replace(/ /g, '-'),
        status: payload.status,
        userId: payload.authorId,
      },
    });

    return res.json({ data: updatedPost });
  } catch (e) {
    const error = e as y.ValidationError;

    return res.status(422).json({ errors: error.errors });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prismaClient.post.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  return res.status(204).send();
};
