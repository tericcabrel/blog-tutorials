import mongoose, { Document, Schema, Model } from 'mongoose';
import { UserDocument } from './user.model';

type CommentInput = {
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

type PostDocument = Document & {
  title: string;
  content: string;
  viewCount: number;
  author: UserDocument['_id'];
  tags: TagEnum[];
  isPublished: boolean;
  comments: CommentInput[];
};

type PostInput = {
  title: PostDocument['title'];
  content: PostDocument['content'];
  viewCount: PostDocument['viewCount'];
  author: PostDocument['author'];
  tags: PostDocument['tags'];
  isPublished: PostDocument['isPublished'];
  comments: PostDocument['comments'];
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

const Post: Model<PostDocument> = mongoose.model('Post', postSchema);

export { Post, PostInput, CommentInput, TagEnum };
