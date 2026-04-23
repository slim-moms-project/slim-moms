import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Slim Moms API',
      version: '1.0.0',
      description: 'Diet and Calorie Tracking Application API Documentation',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./docs/*.js'],
});

export const swaggerDocs = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];
