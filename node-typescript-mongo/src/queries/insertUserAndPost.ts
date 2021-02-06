import { User, UserInput } from '../models/user.model';
import { CommentInput, Post, PostInput, TagEnum } from '../models/post.model';

export const insertUserAndPost = async () => {
  const userInput: UserInput = {
    email: 'jon.snow@got.com',
    name: 'Jon Snow',
    dateOfBirth: new Date(1995, 1, 23),
    location: {
      city: 'Paris',
      country: 'FRA',
    },
  };

  const createdUser = await User.create(userInput);

  const postInput: PostInput = {
    author: createdUser._id,
    comments: [
      {
        text: 'My first comment',
        voteCount: 14,
      },
    ],
    content: 'My first post text content',
    isPublished: false,
    tags: [TagEnum.Node, TagEnum.Docker, TagEnum.GraphQL],
    title: 'My first post title',
    viewCount: 23,
  };

  const createdPost = await Post.create(postInput);

  console.log(createdUser);
  console.log(createdPost);

  const newComment: CommentInput = {
    text: 'A new comment in the post created above',
    voteCount: 32,
  };

  createdPost.comments.push(newComment);
  const updatedPost = await createdPost.save();
  console.log(updatedPost);
};
