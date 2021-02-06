import { User, UserType } from '../models/user.model';
import { Post, PostType, TagEnum } from '../models/post.model';

export const insertUserAndPost = async () => {
  const userInput: UserType = {
    email: 'jon.snow@got.com',
    name: 'Jon Snow',
    dateOfBirth: new Date(1995, 1, 23),
    location: {
      city: 'Paris',
      country: 'FRA',
    },
  };

  const createdUser = await User.create(userInput);

  const postInput: PostType = {
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
};
