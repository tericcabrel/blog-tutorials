import mongoose, { Document, Schema, Model } from 'mongoose';

type CommentType = {
  text: string;
  voteCount: number;
};

enum TagEnum {
  Node = 'Node.js',
  Java = 'Java',
  React = 'React',
  GraphQL = 'GraphQL',
  Spring = 'Spring',
  Typescript = 'Typescript',
  Express = 'Express',
  Docker = 'Docker',
  Jest = 'Jest',
  Jenkins = 'Jenkins',
  AWS = 'AWS',
}

type PostType = {
  title: string;
  content: string;
  viewCount: number;
  author: string;
  tags: TagEnum[];
  isPublished: boolean;
  comments: CommentType[];
};

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      enum: TagEnum,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    comments: [commentSchema],
  },
  {
    collection: 'posts',
    timestamps: true,
  },
);

const Post: Model<Document<PostType>> = mongoose.model('Post', postSchema);

export { Post, PostType, CommentType, TagEnum };
