import { User } from '../models/user.model';
import { Post } from '../models/post.model';

export const deleteData = async () => {
  await User.findByIdAndDelete('601e6711225a273142039d2a');

  await User.findOneAndDelete({ email: 'jon.snow@got.com' });

  await Post.deleteOne({ _id: '601e6711225a273142039d2a' });

  // Delete all posts where the title content "how to"
  await Post.deleteMany({ title: /how to/ });

  const allUserPosts = await Post.find().populate('author').exec();
  console.log(allUserPosts);
};
