import { CreateUserInput, MutationResolvers, QueryResolvers, Resolvers } from './types/types';
import datasource from './datasource';
import { dateTimeScalar } from './types/datetime';

const createUser: MutationResolvers['registerUser'] = (parent, args) => {
  const { createdAt, email, firstName, lastName, password }: CreateUserInput = args.input;

  const user = {
    email,
    firstName,
    id: `${datasource.length + 1}`,
    lastName,
    password,
    createdAt,
  };

  console.log('timestamp => ', createdAt.getTime());

  datasource.push(user);

  return user;
};

const findAllUsers: QueryResolvers['users'] = () => {
  return datasource;
};

const resolvers: Resolvers = {
  DateTime: dateTimeScalar,
  Mutation: {
    registerUser: createUser,
  },
  Query: {
    users: findAllUsers,
  },
};

export default resolvers;
