import { User } from '../models/user.model';
import { Post, TagEnum } from '../models/post.model';

export const retrieveData = async () => {
  // Find all users
  const allUsers = await User.find();

  // Find an user by his Id
  const userById = await User.findById(allUsers[0]._id);
  console.log(userById);

  // Find an user by his email
  const userByEmail = await User.findOne({ email: allUsers[0].email });
  console.log(userByEmail);

  // Find an user by his email
  const partialUserByEmail = await User.findOne({ email: allUsers[0].email }, 'name email');
  console.log(partialUserByEmail);

  // Find user living in France order by creation date Descending
  const users = await User.find({ 'location.country': 'FRA' }).sort('+createdAt');
  console.log(users);

  // Find all post of an user and also fetch the author data (.populate('author'))
  const allUserPosts = await Post.find({ author: users[0]._id }).populate('author').exec();
  console.log(allUserPosts);

  // Find all post of an user and also fetch the author data (.populate('author')) but only his name
  const allUserPostsWithPartialAuthor = await Post.find({ author: users[0]._id }).populate('author', 'name').exec();
  console.log(allUserPostsWithPartialAuthor);

  // Find published post with viewCount Greater than 20 order by creation date Ascending
  const ascPosts = await Post.find({ isPublished: true, viewCount: { $gt: 20 } }).sort('-createdAt');
  console.log(ascPosts);

  // Find post with tags containing Node and Docker and viewCount Greater than between 20 and 30
  const where = `this.tags.includes("${TagEnum.Node}") && this.tags.includes("${TagEnum.Docker}")`;
  const postsWithTags = await Post.find({ $where: where, viewCount: { $gte: 20, $lte: 30 } });
  console.log(postsWithTags);
};
