import { DocumentEntity } from './models/document-entity';
import { User, Folder } from './types/types';

const users: User[] = [
  {
    id: '1',
    name: 'User One',
    password: 'Password',
    email: 'user-one@email.com',
  },
];

const rootFolder: Folder = {
  id: 'one',
  description: 'Description folder one',
  name: 'pickachu',
  createdAt: new Date('2022-10-30T20:12:53.232Z'),
  updatedAt: new Date('2022-10-30T20:12:53.232Z'),
  parent: null,
  path: '_',
  author: users[0],
};

const folders: Folder[] = [
  rootFolder,
  {
    id: 'two',
    description: 'Description folder two',
    name: 'pickoto',
    createdAt: new Date('2022-10-30T20:12:53.232Z'),
    updatedAt: new Date('2022-10-30T20:12:53.232Z'),
    parent: rootFolder,
    author: users[0],
    path: 'one',
  },
];

const data: DocumentEntity[] = [
  {
    id: 'one',
    description: 'Description folder one',
    name: 'pickachu',
    createdAt: new Date('2022-10-30T20:12:53.232Z'),
    updatedAt: new Date('2022-10-30T20:12:53.232Z'),
    parentId: null,
    authorId: '1',
    folderId: null,
    path: '_',
    size: null,
    mimeType: null,
  },
  {
    id: 'two',
    description: 'Description folder two',
    name: 'pickoto',
    createdAt: new Date('2022-10-30T20:12:53.232Z'),
    updatedAt: new Date('2022-10-30T20:12:53.232Z'),
    parentId: 'one',
    authorId: '1',
    folderId: null,
    path: 'one',
    size: null,
    mimeType: null,
  },
  {
    id: 'three',
    description: 'Description file three',
    name: 'nokachu.png',
    createdAt: new Date('2022-10-30T20:12:53.232Z'),
    updatedAt: new Date('2022-10-30T20:12:53.232Z'),
    parentId: null,
    authorId: '1',
    folderId: 'two',
    path: null,
    size: 3232,
    mimeType: 'image/png',
  },
  {
    id: 'four',
    description: 'Description file four',
    name: 'chariza.pdf',
    createdAt: new Date('2022-10-30T20:12:53.232Z'),
    updatedAt: new Date('2022-10-30T20:12:53.232Z'),
    parentId: null,
    authorId: '1',
    folderId: 'one',
    path: null,
    size: 67579,
    mimeType: 'application/pdf',
  },
];

const searchDocuments = (keyword: string): DocumentEntity[] => {
  return data.filter((item) => item.name.toLowerCase().includes(keyword) || item.description?.toLowerCase().includes(keyword));
};

const findUser = (id: string) => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const findFolder = (id: string) => {
  return folders.find((folder) => folder.id === id);
};

export default {
  findFolder,
  findUser,
  searchDocuments,
};
