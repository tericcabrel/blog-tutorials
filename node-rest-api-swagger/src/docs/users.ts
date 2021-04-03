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
    '200': {
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

const deleteUser = {
  tags: ['Users'],
  description: 'Delete a user',
  operationId: 'deleteUser',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: {
    name: 'id',
    in: 'path',
    description: 'User ID',
    required: true,
    schema: {
      type: 'string',
    },
  },
  responses: {
    '200': {
      description: 'User created successfully!',
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

export { createUser, createUserBody, deleteUser };
