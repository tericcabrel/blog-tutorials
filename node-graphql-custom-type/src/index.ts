import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './schema';

// @ts-ignore
const server = new ApolloServer({ typeDefs, resolvers, introspection: true });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}graphql`);
});
