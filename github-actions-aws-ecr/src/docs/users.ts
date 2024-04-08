const userResponseWithRole = {
  _id: {
    type: 'string',
    example: '60564fcb544047cdc3844818',
  },
  fullName: {
    type: 'string',
    example: 'John Snow',
  },
  email: {
    type: 'string',
    example: 'john.snow@email.com',
  },
  password: {
    type: 'string',
    example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
  },
  enabled: {
    type: 'boolean',
    example: true,
  },
  role: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        example: '605636683f6e29c81c8b2db0',
      },
      name: {
        type: 'string',
        example: "Role's name",
      },
      description: {
        type: 'string',
        example: "Role's description",
      },
      createdAt: {
        type: 'string',
        example: '2021-03-19T09:51:01.506Z',
      },
      updatedAt: {
        type: 'string',
        example: '2021-03-19T11:48:25.980Z',
      },
    },
  },
  createdAt: {
    type: 'string',
    example: '2021-03-20T19:40:59.495Z',
  },
  updatedAt: {
    type: 'string',
    example: '2021-03-20T21:23:10.879Z',
  },
};

const internalServerError = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Internal Server Error',
          },
        },
      },
    },
  },
};

const userNotFound = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'User with id: "71675fcb655047cdc4955929" not found',
          },
        },
      },
    },
  },
};

const invalidUserData = {
  description: 'Invalid Data provided',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'The fields field1, field2 and field3 are required',
          },
        },
      },
    },
  },
};

const security = [
  {
    bearerAuth: [],
  },
];

const createUserBody = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string',
      example: 'John Snow',
    },
    email: {
      type: 'string',
      example: 'john.snow@email.com',
    },
    password: {
      type: 'string',
      description: "unencrypted user's password",
      example: '!1234aWe1Ro3$#',
    },
    enabled: {
      type: 'boolean',
      example: true,
    },
    role: {
      type: 'string',
      example: '605636683f6e29c81c8b2db0',
    },
  },
};

const updateUserBody = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string',
      example: 'John Snow',
    },
    role: {
      type: 'string',
      example: '605636683f6e29c81c8b2db0',
    },
  },
};

const createUser = {
  tags: ['Users'],
  description: 'Create a new user in the system',
  operationId: 'createUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createUserBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'User created successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '60564fcb544047cdc3844818',
              },
              fullName: {
                type: 'string',
                example: 'John Snow',
              },
              email: {
                type: 'string',
                example: 'john.snow@email.com',
              },
              password: {
                type: 'string',
                example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
              },
              enabled: {
                type: 'boolean',
                example: true,
              },
              role: {
                type: 'string',
                example: '605636683f6e29c81c8b2db0',
              },
              createdAt: {
                type: 'string',
                example: '2021-03-20T19:40:59.495Z',
              },
              updatedAt: {
                type: 'string',
                example: '2021-03-20T21:23:10.879Z',
              },
            },
          },
        },
      },
    },
    '422': invalidUserData,
    '500': internalServerError,
  },
};

const getUsers = {
  tags: ['Users'],
  description: 'Retrieve all the users',
  operationId: 'getUsers',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'Users retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: userResponseWithRole,
            },
          },
        },
      },
    },
    '500': internalServerError,
  },
};

const getUser = {
  tags: ['Users'],
  description: 'Retrieve one user',
  operationId: 'getUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    '200': {
      description: 'User retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: userResponseWithRole,
          },
        },
      },
    },
    '404': userNotFound,
    '500': internalServerError,
  },
};

const updateUser = {
  tags: ['Users'],
  description: 'Update a user',
  operationId: 'updateUser',
  security,
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/updateUserBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'User retrieved successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: userResponseWithRole,
          },
        },
      },
    },
    '404': userNotFound,
    '422': invalidUserData,
    '500': internalServerError,
  },
};

const deleteUser = {
  tags: ['Users'],
  description: 'Delete a user',
  operationId: 'deleteUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    '200': {
      description: 'User deleted successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'User deleted successfully!',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    },
  },
};

export { createUser, createUserBody, deleteUser, getUsers, getUser, updateUserBody, updateUser };
