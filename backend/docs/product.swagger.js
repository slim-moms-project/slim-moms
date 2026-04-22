export const productSwagger = {
  '/api/product': {
    get: {
      tags: ['Product'],
      summary: 'Get products list',
      description: 'Returns paginated list of products',
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', example: 1 },
        },
        {
          in: 'query',
          name: 'perPage',
          schema: { type: 'integer', example: 10 },
        },
        {
          in: 'query',
          name: 'category',
          schema: { type: 'string', example: 'fruit' },
        },
        {
          in: 'query',
          name: 'minCalories',
          schema: { type: 'number', example: 10 },
        },
        {
          in: 'query',
          name: 'maxCalories',
          schema: { type: 'number', example: 300 },
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', example: 'title' },
        },
        {
          in: 'query',
          name: 'sortOrder',
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
            example: 'asc',
          },
        },
      ],
      responses: {
        200: {
          description: 'Products fetched successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductListResponse',
              },
            },
          },
        },
      },
    },
  },

  '/api/product/search': {
    get: {
      tags: ['Product'],
      summary: 'Search products',
      description: 'Search products by title or category',
      parameters: [
        {
          in: 'query',
          name: 'q',
          required: true,
          schema: { type: 'string', example: 'apple' },
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', example: 1 },
        },
        {
          in: 'query',
          name: 'perPage',
          schema: { type: 'integer', example: 10 },
        },
      ],
      responses: {
        200: {
          description: 'Search completed successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductListResponse',
              },
            },
          },
        },
        400: {
          description: 'Search query is required',
        },
      },
    },
  },

  '/api/product/calculate-daily-calories': {
    post: {
      tags: ['Product'],
      summary: 'Calculate daily calories',
      description: 'Calculates daily calorie needs by body parameters',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['age', 'height', 'weight', 'gender'],
              properties: {
                age: { type: 'integer', example: 25 },
                height: { type: 'number', example: 180 },
                weight: { type: 'number', example: 75 },
                gender: {
                  type: 'string',
                  enum: ['male', 'female'],
                  example: 'male',
                },
                activityLevel: {
                  type: 'string',
                  enum: [
                    'sedentary',
                    'light',
                    'moderate',
                    'active',
                    'veryActive',
                  ],
                  example: 'moderate',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Daily calories calculated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DailyCaloriesResponse',
              },
            },
          },
        },
      },
    },
  },
};

export const productSwaggerSchemas = {
  Product: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        example: '6807d6c3e8f7b2c8190c1234',
      },
      title: {
        type: 'string',
        example: 'Apple',
      },
      category: {
        type: 'string',
        example: 'Fruit',
      },
      calories: {
        type: 'number',
        example: 52,
      },
      weight: {
        type: 'number',
        example: 100,
      },
      createdAt: {
        type: 'string',
        example: '2026-04-22T09:10:00.000Z',
      },
      updatedAt: {
        type: 'string',
        example: '2026-04-22T09:10:00.000Z',
      },
    },
  },

  ProductListResponse: {
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        example: 200,
      },
      message: {
        type: 'string',
        example: 'Products fetched successfully',
      },
      data: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product',
            },
          },
          page: {
            type: 'integer',
            example: 1,
          },
          perPage: {
            type: 'integer',
            example: 10,
          },
          totalItems: {
            type: 'integer',
            example: 50,
          },
          totalPages: {
            type: 'integer',
            example: 5,
          },
          hasPreviousPage: {
            type: 'boolean',
            example: false,
          },
          hasNextPage: {
            type: 'boolean',
            example: true,
          },
        },
      },
    },
  },

  DailyCaloriesResponse: {
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        example: 200,
      },
      message: {
        type: 'string',
        example: 'Daily calories calculated successfully',
      },
      data: {
        type: 'object',
        properties: {
          bmr: {
            type: 'integer',
            example: 1730,
          },
          dailyCalories: {
            type: 'integer',
            example: 2682,
          },
          activityLevel: {
            type: 'string',
            example: 'moderate',
          },
        },
      },
    },
  },
};