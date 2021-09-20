import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: DateTime!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: DateTime!
  }

  type Mutation {
    registerUser(input: CreateUserInput!): User!
  }

  type Query {
    users: [User!]!
  }
`;

export default typeDefs;
