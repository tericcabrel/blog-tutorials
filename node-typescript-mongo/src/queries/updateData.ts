import { User, UserDocument } from '../models/user.model';
import { Post, TagEnum } from '../models/post.model';

export const updateData = async () => {
  const allUsers = await User.find();

  const user: UserDocument | undefined = await User.findById(allUsers[0]._id);

  if (user) {
    user.location = {
      country: 'US',
      city: 'San Francisco',
    };
    const updatedUser = await user.save();

    console.log(updatedUser);
  }

  const userPost = await Post.findOne({ author: user?._id });
  // The "new" option tell mongoose to return the modified document rather than the original
  const updatedPost = await Post.findOneAndUpdate(
    { _id: userPost._id },
    { isPublished: true, tags: [TagEnum.GraphQL, TagEnum.AWS, TagEnum.Jest] },
    {
      new: true,
    },
  );

  console.log(updatedPost);
};
