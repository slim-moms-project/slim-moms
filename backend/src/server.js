import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import router from './routers/index.js';

import { env } from './utils/env.js';
import {
  productSwagger,
  productSwaggerSchemas,
} from '../docs/product.swagger.js';

// Middlewares
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '5000'));

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Slim Moms API',
      version: '1.0.0',
    },
    paths: {
      ...productSwagger,
    },
    components: {
      schemas: {
        ...productSwaggerSchemas,
      },
    },
  },
  apis: ['./docs/*.js'],
});

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Swagger
  app.use('/api-docs', swaggerDocs);

  // Rotaları bağla
  app.use(router);

  // 404 hata yönetimi
  app.use('*all', notFoundHandler);

  // Genel hata yönetimi
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
