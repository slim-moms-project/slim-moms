const diaryTag = 'Diary';

export const diaryPaths = {
  '/diary': {
    get: {
      tags: [diaryTag],
      summary: 'Get diary entries for current user',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'date',
          required: false,
          schema: { type: 'string', format: 'date' },
          description: 'Filter by date (YYYY-MM-DD)',
        },
      ],
      responses: {
        200: {
          description: 'Diary entries fetched successfully',
        },
        400: {
          description: 'Invalid query format',
        },
        401: {
          description: 'Unauthorized',
        },
      },
    },
    post: {
      tags: [diaryTag],
      summary: 'Create a new diary entry',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['productId', 'date', 'amount', 'calories'],
              properties: {
                productId: {
                  type: 'string',
                  pattern: '^[0-9a-fA-F]{24}$',
                },
                date: {
                  type: 'string',
                  format: 'date',
                },
                amount: {
                  type: 'number',
                  minimum: 0.000001,
                },
                calories: {
                  type: 'number',
                  minimum: 0.000001,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Diary entry created successfully',
        },
        400: {
          description: 'Validation error',
        },
        401: {
          description: 'Unauthorized',
        },
      },
    },
  },
  '/diary/{id}': {
    delete: {
      tags: [diaryTag],
      summary: 'Delete diary entry by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
          description: 'Diary entry id',
        },
      ],
      responses: {
        200: {
          description: 'Diary entry deleted successfully',
        },
        400: {
          description: 'Invalid id format',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'Entry not found',
        },
      },
    },
  },
};
