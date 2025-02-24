import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getContactsController } from './controllers/contactsController.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    }),
  );

  // Правильний роут для отримання контактів
  app.get('/contacts', getContactsController);

  // Обробка неіснуючих маршрутів
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Глобальний обробник помилок
  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
