import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Folder {
    id: ID!
    name: String!
    description: String
    path: String!
    parent: Folder
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type File {
    id: ID!
    name: String!
    description: String
    mimeType: String!
    size: Int!
    folder: Folder!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  union Document = File | Folder

  type Query {
    search(keyword: String!): [Document!]!
  }
`;

export default typeDefs;
