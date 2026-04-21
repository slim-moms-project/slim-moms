import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import router from './routers/index.js';

import { env } from './utils/env.js';

// Middlewares
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '5000'));

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
