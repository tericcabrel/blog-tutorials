import { User, UserInput } from "./models/user.model";
import { Product, ProductInput } from "./models/product.model";

const usersInput: UserInput[] = [
  {
    name: 'User First',
    email: 'user.first@email.com',
    bonusMark: 7,
  },
  {
    name: 'User Second',
    email: 'user.second@email.com',
    bonusMark: 5,
  }
];

const productInputs: ProductInput[] = [
  {
    name: 'Product One',
    inStock: 33,
    reference: 'PR0438MW2F',
  },
  {
    name: 'Product Two',
    inStock: 11,
    reference: 'PR1549NY3G',
  },
  {
    name: 'Product Three',
    inStock: 25,
    reference: 'PR2650OZ4H',
  },
];

export const seedDatabaseWithUsersAndProducts = async () => {
  const userPromises = usersInput.map(async (input) => {
    const user = await User.findOne({ email: input.email });

    if (user) {
      return;
    }

    await User.create([input]);
  });

  const productPromises = productInputs.map(async (input) => {
    const product = await Product.findOne({ reference: input.reference });

    if (product) {
      return;
    }

    await Product.create([input]);
  });

  await Promise.all(userPromises);
  await Promise.all(productPromises);
};
