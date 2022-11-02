import { QueryResolvers, Resolvers } from './types/types';
import { dateTimeScalar } from './types/datetime';
import datasource from './datasource';

const searchDocuments: QueryResolvers['search'] = async (parent, args) => {
  return datasource.searchDocuments(args.keyword);
};

const resolvers: Resolvers = {
  DateTime: dateTimeScalar,
  Document: {
    __resolveType: (obj, _context, _info) => {
      // Only Folder has a name field
      if (obj.path) {
        return 'Folder';
      }

      // Only File has a title field
      if (obj.mimeType) {
        return 'File';
      }

      return null;
    },
  },
  File: {
    author: (file) => {
      return datasource.findUser(file.authorId);
    },
    folder: (file) => {
      return datasource.findFolder(file.folderId);
    },
  },
  Folder: {
    author: (folder) => {
      return datasource.findUser(folder.authorId);
    },
    parent: (folder) => {
      return datasource.findFolder(folder.parentId);
    },
  },
  Query: {
    search: searchDocuments,
  },
};

export default resolvers;
