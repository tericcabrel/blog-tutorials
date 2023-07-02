import mongoose, { Document, Schema } from 'mongoose';

export enum PostStatusEnum {
  draft = 'draft',
  published = 'published',
  archived = 'archived',
}

type PostDocument = Document & {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  status: PostStatusEnum;
  viewCount: number;
  isFeatured: boolean;
  author:  mongoose.Types.ObjectId;
};

type PostInput = {
  title: PostDocument['title'];
  slug: PostDocument['slug'];
  content: PostDocument['content'];
  tags: PostDocument['tags'];
  status: PostDocument['status'];
  isFeatured: PostDocument['isFeatured'];
  author: PostDocument['author'];
};

type UpdatePostInput = {
  title: PostDocument['title'];
  slug: PostDocument['slug'];
  content: PostDocument['content'];
  tags: PostDocument['tags'];
  status: PostDocument['status'];
  isFeatured: PostDocument['isFeatured'];
};

const userSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  slug: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  content: {
    type: Schema.Types.String,
    required: true,
  },
  tags: {
    type: Schema.Types.Array,
    required: true,
  },
  status: {
    type: Schema.Types.String,
    required: true,
    enum: PostStatusEnum,
    default: PostStatusEnum.draft,
  },
  viewCount: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  isFeatured: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
}, {
  collection: "posts",
  timestamps: true,
});

const Post = mongoose.model<PostDocument>('Post', userSchema);

export { Post, PostDocument, PostInput, UpdatePostInput };