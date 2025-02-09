import { createUser, createUserBody, deleteUser, getUser, getUsers, updateUser, updateUserBody } from './users';
import { createOrUpdateRoleBody, createRole, deleteRole, getRole, getRoles, updateRole } from './roles';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'My REST API - Documentation',
    description: 'Description of my API here',
    termsOfService: 'https://mysite.com/terms',
    contact: {
      name: 'Developer name',
      email: 'dev@example.com',
      url: 'https://devwebsite.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:4500/',
      description: 'Local Server',
    },
    {
      url: 'https://api.mysite.com',
      description: 'Production Server',
    },
  ],
  tags: [
    {
      name: 'Roles',
    },
    {
      name: 'Users',
    },
  ],
  paths: {
    users: {
      post: createUser,
      get: getUsers,
    },
    'users/{id}': {
      delete: deleteUser,
      get: getUser,
      patch: updateUser,
    },
    roles: {
      post: createRole,
      get: getRoles,
    },
    'roles/{id}': {
      delete: deleteRole,
      get: getRole,
      put: updateRole,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      createUserBody,
      updateUserBody,
      createOrUpdateRoleBody,
    },
  },
};

export { apiDocumentation };
